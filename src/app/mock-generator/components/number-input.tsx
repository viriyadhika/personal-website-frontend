import { Input, InputProps } from "@mui/material";

export default function NumberInput({
  value,
  onChange,
}: Omit<InputProps, "value" | "onChange"> & {
  value: string;
  onChange: (newValue: string) => void;
}) {
  return (
    <Input
      value={value}
      onChange={(e) => {
        const newValue = e.target.value;
        if (isNaN(Number(newValue))) {
          return;
        }
        onChange(newValue);
      }}
    />
  );
}
