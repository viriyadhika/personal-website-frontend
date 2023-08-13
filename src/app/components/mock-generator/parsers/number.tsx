import { DatePicker, Input, Select, Typography } from "@arco-design/web-react";
import { ReactNode, useState } from "react";
import { Param } from "../type";
import dayjs from "dayjs";

const enum NumberOption {
  HARDCODED = "HARDCODED",
  TIMESTAMP = "TIMESTAMP",
}

const options = [NumberOption.HARDCODED, NumberOption.TIMESTAMP];

export default function NumberParser({
  defaultValue,
  onChange,
}: {
  defaultValue: number;
  onChange: (param: Param) => void;
}) {
  const [option, setOption] = useState(NumberOption.HARDCODED);
  const optionsMapping: Record<NumberOption, ReactNode> = {
    [NumberOption.HARDCODED]: (
      <HardCoded onChange={onChange} defaultValue={defaultValue} />
    ),
    [NumberOption.TIMESTAMP]: (
      <TimeStamp onChange={onChange} defaultValue={dayjs().unix()} />
    ),
  };

  const defaultValueMap: Record<NumberOption, Param> = {
    [NumberOption.HARDCODED]: {
      type: "number",
      value: defaultValue,
      config: {},
    },
    [NumberOption.TIMESTAMP]: {
      type: "number",
      value: dayjs().unix(),
      config: {},
    },
  };

  return (
    <>
      <Typography.Text bold>Number</Typography.Text>
      <Select
        placeholder="Please select"
        onChange={(value: NumberOption) => {
          onChange(defaultValueMap[value]);
          setOption(value);
        }}
        options={options}
        value={option}
      />
      {optionsMapping[option]}
    </>
  );
}

function HardCoded({
  defaultValue,
  onChange,
}: {
  defaultValue: number;
  onChange: (param: Param) => void;
}) {
  const [value, setValue] = useState(String(defaultValue));
  function handleChange(newVal: string) {
    if (isNaN(Number(newVal))) {
      return;
    }
    setValue(newVal);
    onChange({ type: "number", value: Number(newVal), config: {} });
  }

  return (
    <Input
      placeholder="Insert number"
      value={String(value)}
      onChange={handleChange}
    />
  );
}

function formatDate(timestamp: number) {
  return dayjs.unix(timestamp).format("YYYY-MM-DD");
}

function TimeStamp({
  defaultValue,
  onChange,
}: {
  defaultValue: number;
  onChange: (param: Param) => void;
}) {
  const [value, setValue] = useState(defaultValue);
  function handleChange(newVal: string) {
    const timestamp = dayjs(newVal).unix();
    setValue(timestamp);
    onChange({ type: "number", value: timestamp, config: {} });
  }

  return <DatePicker value={formatDate(value)} onChange={handleChange} />;
}
