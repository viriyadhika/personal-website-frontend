import { Collapse } from "@arco-design/web-react";
import { Param } from "./type";
import { useState } from "react";
import Parser from "./parser";
// import Parser from './parser'
const { Item: CollapseItem } = Collapse;

export default function ObjectParser({
  param,
  depth,
  onChange,
}: {
  param: any;
  depth: number;
  onChange: (param: Param) => void;
}) {
  const [result, setResult] = useState<any>(param);
  const keys = Object.keys(param);

  return (
    <Collapse defaultActiveKey={keys.map((key) => `${depth}${key}`)}>
      {keys.map((key) => {
        return (
          <CollapseItem header={key} name={`${depth}${key}`} key={key}>
            <Parser
              param={param[key]}
              depth={depth}
              onChange={(newParam: Param) => {
                const newResult: Param = {
                  ...result,
                  [key]: newParam,
                };
                setResult(newResult);
                onChange({
                  type: "object",
                  value: newResult,
                  config: {},
                });
              }}
            />
          </CollapseItem>
        );
      })}
    </Collapse>
  );
}
