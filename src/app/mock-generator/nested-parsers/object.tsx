import { Param } from "../utils/type";
import { useState } from "react";
import Parser from "../parser";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";

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
    <div>
      {keys.map((key) => {
        return (
          <Accordion key={key}>
            <AccordionSummary>{key}</AccordionSummary>
            <AccordionDetails>
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
            </AccordionDetails>
          </Accordion>
        );
      })}
    </div>
  );
}
