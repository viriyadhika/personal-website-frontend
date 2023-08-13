import { ArrayRule, ArrayRuleCategory, Param } from "./type";
import { Button, Collapse, Input, Select } from "@arco-design/web-react";
import { ReactNode, useState } from "react";
import { dateManager, editArray } from "./utils";
import Parser from "./parser";

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

  function handeSizeChange(size: string) {
    if (isNaN(Number(size))) {
      return;
    }

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
    <Collapse defaultActiveKey={"Array"}>
      <CollapseItem name={"Array"} header={"Array"}>
        <Input
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
          const newRules = rules.slice(0, options.length - 1);
          onChange(newRules);
        }}
      >
        Remove last rule
      </Button>
    </div>
  );
}

const options = [ArrayRuleCategory.TIME_SERIES];

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
  };

  return (
    <>
      <Select
        options={options}
        onChange={(selection: ArrayRuleCategory) => {
          onChange({
            ...rule,
            category: selection,
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
  return (
    <>
      <Select
        options={generateNumberFields(arrayContent, [])}
        onChange={(path: string) => {
          onChange({
            ...rule,
            payload: {
              path,
              startTimestamp: dateManager().unix(),
              period: dateManager.duration({ days: 1 }).asMilliseconds(),
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
