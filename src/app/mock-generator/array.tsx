import { ArrayRule, ArrayRuleCategory, Param } from "./type";
import {
  Button,
  Collapse,
  DatePicker,
  Input,
  Select,
} from "@arco-design/web-react";
import { ReactNode, useState } from "react";
import { dateManager, editArray, formatDate } from "./utils";
import Parser from "./parser";
import NumberInput from "./components/number-input";

const { Item: CollapseItem } = Collapse;

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

  function handeSizeChange(size: number) {
    setSize(size.toString());
    onChange({
      type: "array",
      config: {
        size,
        rules,
      },
      value: arrayContent,
    });
  }

  return (
    <Collapse defaultActiveKey={"Array"}>
      <CollapseItem name={"Array"} header={"Array"}>
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
      </CollapseItem>
    </Collapse>
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
        options={options}
        onChange={(selection: ArrayRuleCategory) => {
          onChange({
            ...rule,
            category: selection,
            payload: {},
          });
        }}
        value={rule.category}
      />
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
        options={generateNumberFields(arrayContent, [])}
        onChange={(newPath: string) => {
          setPath(newPath);
          onChange({
            ...rule,
            category: ArrayRuleCategory.TIME_SERIES,
            payload: {
              path: newPath,
              startTimestamp: startTimestamp,
              period: dateManager
                .duration({ [periodValue.unit]: periodValue.value })
                .asMilliseconds(),
            },
          });
        }}
      />
      <DatePicker
        value={formatDate(startTimestamp)}
        onChange={(newValue: string) => {
          const newStartTimestamp = dateManager(newValue).unix();
          setStartTimestamp(newStartTimestamp);
          onChange({
            ...rule,
            category: ArrayRuleCategory.TIME_SERIES,
            payload: {
              path,
              startTimestamp: newStartTimestamp,
              period: dateManager
                .duration({ [periodValue.unit]: periodValue.value })
                .asMilliseconds(),
            },
          });
        }}
      />
      <Input
        value={periodValue.value.toString()}
        onChange={(newValue: string) => {
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
                .asMilliseconds(),
            },
          });
        }}
      />
      <Select
        options={["days", "hours"]}
        value={periodValue.unit}
        onChange={(newValue: "days" | "hours") => {
          setPeriodValue((cur) => ({ ...cur, unit: newValue }));
          onChange({
            ...rule,
            category: ArrayRuleCategory.TIME_SERIES,
            payload: {
              path,
              startTimestamp,
              period: dateManager
                .duration({ [newValue]: periodValue.value })
                .asMilliseconds(),
            },
          });
        }}
      />
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
        options={generateNumberFields(arrayContent, [])}
        onChange={(newPath: string) => {
          setPath(newPath);
          onChange({
            category: ArrayRuleCategory.TOTAL,
            payload: {
              path: newPath,
              total: Number(total),
            },
          });
        }}
      />
      <NumberInput
        value={total.toString()}
        onChange={(newValue) => {
          setTotal(newValue.toString());
          onChange({
            category: ArrayRuleCategory.TOTAL,
            payload: {
              path: path,
              total: newValue,
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
