"use client";

import { Button, Input, Radio, Typography } from "@arco-design/web-react";
const RadioGroup = Radio.Group;
import "@arco-design/web-react/dist/css/arco.css";

import Parser from "./parser";
import { generate, map } from "./utils/utils";
import React, { ChangeEvent, useRef, useState } from "react";
import CopyButton from "./components/copy-button/copy-button";
import { Param } from "./utils/type";

const { TextArea } = Input;

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
    [State.ERROR]: (
      <Typography.Text type="warning">Enter a valid JSON</Typography.Text>
    ),
    [State.INITIAL]: (
      <Typography.Text>
        Enter some JSON to start generating mock
      </Typography.Text>
    ),
    [State.SUCCESS]: (
      <Typography.Text type="success">
        Parsing successful, click on Generate and see console
      </Typography.Text>
    ),
  };

  return (
    <>
      <RadioGroup defaultValue={Mode.JSON} style={{ marginBottom: 20 }}>
        <Radio
          value={Mode.JSON}
          checked={mode === Mode.JSON}
          onChange={(checked: boolean) => {
            if (checked) {
              setMode(Mode.JSON);
              setIsGenerating(false);
            }
          }}
        >
          {Mode.JSON}
        </Radio>
        <Radio
          value={Mode.Config}
          checked={mode === Mode.Config}
          onChange={(checked: boolean) => {
            if (checked) {
              setMode(Mode.Config);
              setIsGenerating(false);
            }
          }}
        >
          {Mode.Config}
        </Radio>
      </RadioGroup>
      <TextArea
        value={param}
        onChange={setParam}
        placeholder="Enter JSON"
        autoSize={{ minRows: 5 }}
        disabled={isGenerating}
      />
      <div>{mapping[input.state]}</div>
      <Button
        type="primary"
        onClick={() => {
          setIsGenerating(true);
        }}
      >
        Generate!
      </Button>
      <Button
        type="secondary"
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
    </>
  );
}
