import { Input, InputProps } from "@arco-design/web-react";

export default function NumberInput({
  value,
  onChange,
}: Omit<InputProps, "value" | "onChange"> & {
  value: string;
  onChange: (newValue: number) => void;
}) {
  return (
    <Input
      value={value}
      onChange={(newValue: string) => {
        if (isNaN(Number(newValue))) {
          return;
        }
        onChange(Number(newValue));
      }}
    />
  );
}
