"use client";

import { Button, Input, Typography } from "@arco-design/web-react";
import "@arco-design/web-react/dist/css/arco.css";

import Parser from "./parser";
import { generate, map } from "./utils/utils";
import React, { useRef, useState } from "react";
import CopyButton from "./components/copy-button/copy-button";

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

function ParserWithResult({ initialObject }: { initialObject: any }) {
  const configRef = useRef(map(initialObject));

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
        param={map(initialObject)}
        depth={0}
        onChange={(value) => {
          configRef.current = value;
        }}
      />
    </div>
  );
}

export default function Wrapper() {
  const [param, setParam] = useState("");
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
      {isGenerating && <ParserWithResult initialObject={input.result} />}
    </>
  );
}
