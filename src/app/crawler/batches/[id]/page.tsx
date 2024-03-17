"use client";
import { useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { dateManager } from "@/app/mock-generator/utils/utils";
import { DatePicker } from "@/app/common/components/date-picker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Stack } from "@mui/material";
import { APIHandlerProvider } from "@/app/common/context/APIContext";
import JobTable from "./components/table";

type BatchesProps = { params: { id: string } };

function Batches({ params: { id } }: BatchesProps) {
  const [current, setCurrent] = useState(() => dateManager().unix());
  const [comparison, setComparison] = useState(() => current - 24 * 3600);

  return (
    <Stack gap={2}>
      <DatePicker
        label={"Current date"}
        value={dateManager.unix(current)}
        onChange={(value) => {
          if (value) {
            setCurrent(value.unix());
          }
        }}
      />
      <DatePicker
        label={"Compare to date"}
        value={dateManager.unix(comparison)}
        onChange={(value) => {
          if (value) {
            setComparison(value.unix());
          }
        }}
      />
      <JobTable current={current} comparison={comparison} id={id} />
    </Stack>
  );
}

export default function BatchesWithWrapper(props: BatchesProps) {
  return (
    <APIHandlerProvider>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Batches {...props} />
      </LocalizationProvider>
    </APIHandlerProvider>
  );
}
