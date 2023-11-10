import { Checkbox } from "@mui/material";
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

  return (
    <Checkbox
      placeholder="Insert boolean"
      value={value}
      onChange={(e) => {
        setValue(e.target.checked);
        onChange({ type: "boolean", value: e.target.checked, config: {} });
      }}
    />
  );
}
