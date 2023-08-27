"use client";

import { Button, Input, Typography } from "@arco-design/web-react";
import "@arco-design/web-react/dist/css/arco.css";

import Parser from "./parser";
import { generate, map } from "./utils";
import React, { useState } from "react";

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
      {isGenerating && (
        <Parser
          param={map(input.result)}
          depth={0}
          onChange={(value) => {
            console.log(generate(value));
          }}
        />
      )}
    </>
  );
}