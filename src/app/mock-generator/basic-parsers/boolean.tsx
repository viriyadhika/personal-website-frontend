import { Checkbox } from "@arco-design/web-react";
import { Param } from "../utils/type";
import { useState } from "react";

export default function BooleanParser({
  bool,
  onChange,
}: {
  bool: boolean;
  onChange: (param: Param) => void;
}) {
  const [value, setValue] = useState(bool);
  function handleChange(checked: boolean) {
    setValue(checked);
    onChange({ type: "boolean", value: checked, config: {} });
  }

  return (
    <Checkbox
      placeholder="Insert boolean"
      value={value}
      onChange={handleChange}
    />
  );
}
