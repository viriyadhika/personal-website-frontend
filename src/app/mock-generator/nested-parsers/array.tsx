import { ArrayRule, ArrayRuleCategory, Param } from "../utils/type";
import {
  Button,
  Accordion,
  Input,
  MenuItem,
  Select,
  AccordionDetails,
  AccordionSummary,
} from "@mui/material";
import { ReactNode, useState } from "react";
import { dateManager, editArray } from "../utils/utils";
import Parser from "../parser";
import NumberInput from "../components/number-input";
import { DatePicker } from "../components/date-picker";

export default function ArrayParser({
  defaultArrayContent,
  defaultSize,
  depth,
  onChange,
}: {
  defaultArrayContent: Param;
  defaultSize: number;
  depth: number;
  onChange: (param: Param) => void;
}) {
  const [size, setSize] = useState(String(defaultSize));
  const [arrayContent, setArrayContent] = useState(defaultArrayContent);
  const [rules, setRules] = useState<ArrayRule[]>([]);

  function handeSizeChange(size: string) {
    setSize(size);
    onChange({
      type: "array",
      config: {
        size: Number(size),
        rules,
      },
      value: arrayContent,
    });
  }

  return (
    <Accordion>
      <AccordionSummary>Array</AccordionSummary>
      <AccordionDetails>
        <NumberInput
          placeholder="size"
          value={String(size)}
          onChange={handeSizeChange}
        />
        <RuleList
          arrayContent={arrayContent}
          onChange={(newRules) => {
            onChange({
              type: "array",
              config: {
                size: Number(size),
                rules: newRules,
              },
              value: arrayContent,
            });
            setRules(newRules);
          }}
          rules={rules}
        />
        <Parser
          depth={depth}
          param={arrayContent}
          onChange={(param) => {
            setArrayContent(param);
            onChange({
              type: "array",
              config: {
                size: Number(size),
                rules,
              },
              value: param,
            });
          }}
        />
      </AccordionDetails>
    </Accordion>
  );
}

function RuleList({
  arrayContent,
  rules,
  onChange,
}: {
  arrayContent: Param;
  onChange: (rules: ArrayRule[]) => void;
  rules: ArrayRule[];
}) {
  return (
    <div>
      {rules.map((value, idx) => {
        return (
          <Rule
            key={idx}
            arrayContent={arrayContent}
            rule={value}
            onChange={(rule) => {
              const newRules = editArray(rules, rule, idx);
              onChange(newRules);
            }}
          />
        );
      })}
      <Button
        onClick={() => {
          const newRules = [
            ...rules,
            {
              category: ArrayRuleCategory.TIME_SERIES,
              payload: {},
            },
          ];
          onChange(newRules);
        }}
      >
        Add more rules
      </Button>
      <Button
        onClick={() => {
          const newRules = rules.slice(0, rules.length - 1);
          onChange(newRules);
        }}
      >
        Remove last rule
      </Button>
    </div>
  );
}

const options = [ArrayRuleCategory.TIME_SERIES, ArrayRuleCategory.TOTAL];

function Rule({
  arrayContent,
  rule,
  onChange,
}: {
  arrayContent: Param;
  rule: ArrayRule;
  onChange: (newRule: ArrayRule) => void;
}) {
  const optionsToComponentMap: Record<ArrayRuleCategory, ReactNode> = {
    [ArrayRuleCategory.TIME_SERIES]: (
      <TimeSeries arrayContent={arrayContent} rule={rule} onChange={onChange} />
    ),
    [ArrayRuleCategory.TOTAL]: (
      <Restriction
        arrayContent={arrayContent}
        rule={rule}
        onChange={onChange}
      />
    ),
  };

  return (
    <>
      <Select
        onChange={(e) => {
          onChange({
            ...rule,
            category: e.target.value as ArrayRuleCategory,
            payload: {},
          });
        }}
        value={rule.category}
      >
        {options.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
      {optionsToComponentMap[rule.category]}
    </>
  );
}

function TimeSeries({
  arrayContent,
  rule,
  onChange,
}: {
  arrayContent: Param;
  rule: ArrayRule;
  onChange: (newRule: ArrayRule) => void;
}) {
  const [startTimestamp, setStartTimestamp] = useState<number>(
    dateManager().unix()
  );
  const [path, setPath] = useState("");
  const [periodValue, setPeriodValue] = useState<{
    value: number;
    unit: "days" | "hours";
  }>({
    value: 1,
    unit: "days",
  });

  return (
    <>
      <Select
        onChange={(e) => {
          setPath(e.target.value);
          onChange({
            ...rule,
            category: ArrayRuleCategory.TIME_SERIES,
            payload: {
              path: e.target.value,
              startTimestamp: startTimestamp,
              period: dateManager
                .duration({ [periodValue.unit]: periodValue.value })
                .asSeconds(),
            },
          });
        }}
        value={path}
      >
        {generateNumberFields(arrayContent, []).map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
      <DatePicker
        value={dateManager.unix(startTimestamp)}
        onChange={(newValue) => {
          const newStartTimestamp = newValue!.unix();
          setStartTimestamp(newStartTimestamp);
          onChange({
            ...rule,
            category: ArrayRuleCategory.TIME_SERIES,
            payload: {
              path,
              startTimestamp: newStartTimestamp,
              period: dateManager
                .duration({ [periodValue.unit]: periodValue.value })
                .asSeconds(),
            },
          });
        }}
      />
      <Input
        value={periodValue.value.toString()}
        onChange={(e) => {
          const newValue = e.target.value;
          if (isNaN(Number(newValue))) {
            return;
          }
          setPeriodValue((cur) => ({ ...cur, value: Number(newValue) }));
          onChange({
            ...rule,
            category: ArrayRuleCategory.TIME_SERIES,
            payload: {
              path,
              startTimestamp,
              period: dateManager
                .duration({ [periodValue.unit]: Number(newValue) })
                .asSeconds(),
            },
          });
        }}
      />
      <Select
        value={periodValue.unit}
        onChange={(e) => {
          const newValue = e.target.value as "days" | "hours";
          setPeriodValue((cur) => ({ ...cur, unit: newValue }));
          onChange({
            ...rule,
            category: ArrayRuleCategory.TIME_SERIES,
            payload: {
              path,
              startTimestamp,
              period: dateManager
                .duration({ [newValue]: periodValue.value })
                .asSeconds(),
            },
          });
        }}
      >
        {["days", "hours"].map((item) => (
          <MenuItem key={item} value={item}>
            {item}
          </MenuItem>
        ))}
      </Select>
    </>
  );
}

function Restriction({
  arrayContent,
  rule,
  onChange,
}: {
  arrayContent: Param;
  rule: ArrayRule;
  onChange: (newRule: ArrayRule) => void;
}) {
  const [total, setTotal] = useState<string>("");
  const [path, setPath] = useState("");
  return (
    <>
      <Select
        onChange={(e) => {
          const newPath = e.target.value;
          setPath(newPath);
          onChange({
            category: ArrayRuleCategory.TOTAL,
            payload: {
              path: newPath,
              total: Number(total),
            },
          });
        }}
        value={path}
      >
        {generateNumberFields(arrayContent, []).map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
      <NumberInput
        value={total.toString()}
        onChange={(newValue) => {
          setTotal(newValue);
          onChange({
            category: ArrayRuleCategory.TOTAL,
            payload: {
              path: path,
              total: Number(newValue),
            },
          });
        }}
      />
    </>
  );
}

function generateNumberFields(param: Param, path: string[]): string[] {
  if (param.type === "number") {
    return [path.join(".")];
  }

  if (
    param.type === "boolean" ||
    param.type === "string" ||
    param.type === "array"
  ) {
    return [];
  }

  if (param.type === "object") {
    const entries = Object.entries(param.value).reduce(
      (prev: string[], [key, value]: any) => {
        return [...prev, ...generateNumberFields(value, [...path, key])];
      },
      []
    );

    return entries;
  }
  return [];
}
