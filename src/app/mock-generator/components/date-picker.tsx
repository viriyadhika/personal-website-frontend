import { ComponentType, LazyExoticComponent, Suspense, lazy } from "react";
import { DatePickerProps } from "@mui/x-date-pickers";
import { Dayjs } from "dayjs";

const DatePickerLazy: LazyExoticComponent<
  ComponentType<DatePickerProps<Dayjs>>
> = lazy(() =>
  import("@mui/x-date-pickers").then(({ DatePicker }) => ({
    default: DatePicker,
  }))
);

export function DatePicker(props: DatePickerProps<Dayjs>) {
  return (
    <Suspense fallback={"..."}>
      <DatePickerLazy {...props} />
    </Suspense>
  );
}
