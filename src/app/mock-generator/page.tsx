"use client";

import { Button, TextareaAutosize, RadioGroup, Radio } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import Parser from "./parser";
import { generate, map } from "./utils/utils";
import React, { useRef, useState } from "react";
import CopyButton from "./components/copy-button/copy-button";
import { Param } from "./utils/type";
import { Typography } from "@mui/material";

enum State {
  INITIAL,
  ERROR,
  SUCCESS,
}

function parseJSON(jsonString: string): { state: State; result: any } {
  if (jsonString === "") {
    return {
      state: State.INITIAL,
      result: "",
    };
  }

  try {
    return {
      state: State.SUCCESS,
      result: JSON.parse(jsonString),
    };
  } catch (e) {
    return {
      state: State.ERROR,
      result: "",
    };
  }
}

function ParserWithResult({ initialConfig }: { initialConfig: Param }) {
  const configRef = useRef(initialConfig);

  return (
    <div>
      {/* Avoid rerendering copy button thus passing in the ref object */}
      <CopyButton
        configRef={configRef}
        title="Copy config to clipboard"
        formatter={JSON.stringify}
      />
      {/* Avoid rerendering copy button thus passing in the ref object */}
      <CopyButton
        configRef={configRef}
        title="Copy result to clipboard"
        formatter={(param) => JSON.stringify(generate(param))}
      />
      <Parser
        param={initialConfig}
        depth={0}
        onChange={(value) => {
          configRef.current = value;
        }}
      />
    </div>
  );
}

enum Mode {
  JSON = "JSON",
  Config = "Config",
}

export default function Wrapper() {
  const [param, setParam] = useState("");
  const [mode, setMode] = useState<Mode>(Mode.JSON);
  const [isGenerating, setIsGenerating] = useState(false);

  const input = parseJSON(param);
  const mapping: Record<State, React.ReactNode> = {
    [State.ERROR]: <Typography>Enter a valid JSON</Typography>,
    [State.INITIAL]: (
      <Typography>Enter some JSON to start generating mock</Typography>
    ),
    [State.SUCCESS]: (
      <Typography color="success.main">
        Parsing successful, click on Generate and see console
      </Typography>
    ),
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <RadioGroup defaultValue={Mode.JSON} style={{ marginBottom: 20 }}>
        <div>
          <Radio
            value={Mode.JSON}
            checked={mode === Mode.JSON}
            onChange={(e) => {
              if (e.target.checked) {
                setMode(Mode.JSON);
                setIsGenerating(false);
              }
            }}
          />
          <span>{Mode.JSON}</span>
        </div>
        <div>
          <Radio
            value={Mode.Config}
            checked={mode === Mode.Config}
            onChange={(e) => {
              if (e.target.checked) {
                setMode(Mode.Config);
                setIsGenerating(false);
              }
            }}
          />
          <span>{Mode.Config}</span>
        </div>
      </RadioGroup>
      <TextareaAutosize
        value={param}
        onChange={(e) => setParam(e.target.value)}
        placeholder="Enter JSON"
        minRows={5}
        maxRows={10}
        disabled={isGenerating}
      />
      <div>{mapping[input.state]}</div>
      <Button
        color="success"
        onClick={() => {
          setIsGenerating(true);
        }}
      >
        Generate!
      </Button>
      <Button
        color="info"
        onClick={() => {
          setIsGenerating(false);
        }}
      >
        Reset
      </Button>
      {isGenerating && (
        <ParserWithResult
          initialConfig={mode === Mode.JSON ? map(input.result) : input.result}
        />
      )}
    </LocalizationProvider>
  );
}
