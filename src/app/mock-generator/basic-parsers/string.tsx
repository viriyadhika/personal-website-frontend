import { ReactNode, useState } from "react";
import { Param, StringOption } from "../utils/type";
import { editArray } from "../utils/utils";
import { Button, Input, Select } from "@arco-design/web-react";
import NumberInput from "../components/number-input";
const options = [
  StringOption.HARDCODED,
  StringOption.IMAGE,
  StringOption.RANDOM_CHARACTERS,
  StringOption.RANDOM_WITH_OPTION,
];

export default function StringParser({
  defaultValue,
  defaultOption,
  onChange,
}: {
  defaultValue: string;
  defaultOption: StringOption;
  onChange: (param: Param) => void;
}) {
  const [option, setOption] = useState(defaultOption);

  const optionsMapping: Record<StringOption, ReactNode> = {
    [StringOption.HARDCODED]: (
      <HardCoded onChange={onChange} defaultValue={defaultValue} />
    ),
    [StringOption.IMAGE]: <></>,
    [StringOption.RANDOM_CHARACTERS]: <Random onChange={onChange} />,
    [StringOption.RANDOM_WITH_OPTION]: (
      <RandomWithOption defaultOptions={[]} onChange={onChange} />
    ),
  };

  const defaultValueMap: Record<StringOption, Param> = {
    [StringOption.HARDCODED]: {
      type: "string",
      value: defaultValue,
      config: {
        option: StringOption.HARDCODED,
      },
    },
    [StringOption.IMAGE]: {
      type: "string",
      value: "",
      config: {
        option: StringOption.IMAGE,
      },
    },
    [StringOption.RANDOM_CHARACTERS]: {
      type: "string",
      value: "",
      config: {
        option: StringOption.RANDOM_CHARACTERS,
        size: 0,
      },
    },
    [StringOption.RANDOM_WITH_OPTION]: {
      type: "string",
      value: "",
      config: {
        option: StringOption.RANDOM_WITH_OPTION,
        options: [],
      },
    },
  };

  return (
    <>
      <strong>String</strong>
      <Select
        placeholder="Please select"
        onChange={(value: StringOption) => {
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

function RandomWithOption({
  onChange,
  defaultOptions,
}: {
  onChange: (param: Param) => void;
  defaultOptions: string[];
}) {
  const [options, setOptions] = useState(defaultOptions);

  function setNewOptions(newOptions: string[]) {
    onChange({
      type: "string",
      value: "",
      config: {
        option: StringOption.RANDOM_WITH_OPTION,
        options: newOptions,
      },
    });
    setOptions(newOptions);
  }

  return (
    <>
      {options.map((option, idx) => {
        return (
          <Input
            key={idx}
            value={option}
            onChange={(newOption) => {
              const newOptions = editArray(options, newOption, idx);
              setNewOptions(newOptions);
            }}
          />
        );
      })}
      <Button
        onClick={() => {
          const newOptions = [...options, ""];
          setNewOptions(newOptions);
        }}
      >
        Add more options
      </Button>
      <Button
        onClick={() => {
          const newOptions = options.slice(0, options.length - 1);
          setNewOptions(newOptions);
        }}
      >
        Remove last
      </Button>
    </>
  );
}

function Random({ onChange }: { onChange: (param: Param) => void }) {
  const [size, setSize] = useState("");
  function handleChange(newVal: string) {
    setSize(newVal);
    onChange({
      type: "string",
      value: "",
      config: {
        option: StringOption.RANDOM_CHARACTERS,
        size: Number(newVal),
      },
    });
  }

  return (
    <NumberInput
      placeholder="Insert size"
      value={size}
      onChange={handleChange}
    />
  );
}

function HardCoded({
  defaultValue,
  onChange,
}: {
  defaultValue: string;
  onChange: (param: Param) => void;
}) {
  const [value, setValue] = useState(defaultValue);
  function handleChange(newVal: string) {
    setValue(newVal);
    onChange({
      type: "string",
      value: newVal,
      config: {
        option: StringOption.HARDCODED,
      },
    });
  }
  return (
    <Input placeholder="Insert string" value={value} onChange={handleChange} />
  );
}
