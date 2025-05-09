import { Input, MenuItem, Select } from "@mui/material";

import { ReactNode, useState } from "react";
import { NumberOption, Param } from "../utils/type";
import dayjs from "dayjs";
import { dateManager } from "../utils/utils";
import NumberInput from "../components/number-input";
import { DatePicker } from "../../common/components/date-picker";

const options = [
  NumberOption.HARDCODED,
  NumberOption.TIMESTAMP,
  NumberOption.RANDOM_BETWEEN,
];

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
    [NumberOption.RANDOM_BETWEEN]: <RandomBetween onChange={onChange} />,
  };

  const defaultValueMap: Record<NumberOption, Param> = {
    [NumberOption.HARDCODED]: {
      type: "number",
      value: defaultValue,
      config: {
        option: NumberOption.HARDCODED,
      },
    },
    [NumberOption.TIMESTAMP]: {
      type: "number",
      value: dayjs().unix(),
      config: {
        option: NumberOption.TIMESTAMP,
      },
    },
    [NumberOption.RANDOM_BETWEEN]: {
      type: "number",
      value: dayjs().unix(),
      config: {
        option: NumberOption.RANDOM_BETWEEN,
        start: 0,
        end: 0,
      },
    },
  };

  return (
    <>
      <strong>Number</strong>
      <Select
        onChange={(e) => {
          const value = e.target.value as NumberOption;
          onChange(defaultValueMap[value]);
          setOption(value);
        }}
        value={option}
      >
        {options.map((option) => {
          return (
            <MenuItem value={option} key={option}>
              {option}
            </MenuItem>
          );
        })}
      </Select>
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

  return (
    <Input
      placeholder="Insert number"
      value={String(value)}
      onChange={(e) => {
        const newVal = e.target.value;
        if (isNaN(Number(newVal))) {
          return;
        }
        setValue(newVal);
        onChange({
          type: "number",
          value: Number(newVal),
          config: {
            option: NumberOption.HARDCODED,
          },
        });
      }}
    />
  );
}

function TimeStamp({
  defaultValue,
  onChange,
}: {
  defaultValue: number;
  onChange: (param: Param) => void;
}) {
  const [value, setValue] = useState(defaultValue);
  return (
    <DatePicker
      value={dateManager.unix(value)}
      onChange={(newVal) => {
        const timestamp = newVal!.unix();
        setValue(timestamp);
        onChange({
          type: "number",
          value: timestamp,
          config: {
            option: NumberOption.TIMESTAMP,
          },
        });
      }}
    />
  );
}

function RandomBetween({ onChange }: { onChange: (param: Param) => void }) {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  return (
    <>
      <NumberInput
        value={from}
        onChange={(newFrom) => {
          setFrom(newFrom.toString());
          onChange({
            type: "number",
            value: 0,
            config: {
              option: NumberOption.RANDOM_BETWEEN,
              start: Number(newFrom),
              end: Number(to),
            },
          });
        }}
      />
      <NumberInput
        value={to}
        onChange={(newTo) => {
          setTo(newTo.toString());
          onChange({
            type: "number",
            value: 0,
            config: {
              option: NumberOption.RANDOM_BETWEEN,
              start: Number(from),
              end: Number(newTo),
            },
          });
        }}
      />
    </>
  );
}
