import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
} from "@mui/material";
import AccessAlarmIcon from "@mui/icons-material/AccessAlarm";
import { useContext, useState } from "react";
import { DateTimePicker } from "@/app/common/components/date-picker";
import { dateManager } from "@/app/mock-generator/utils/utils";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import HourglassTopIcon from "@mui/icons-material/HourglassTop";
import axios from "axios";
import { getAuthOptions } from "@/utilities/utils";
import { Dayjs } from "dayjs";
import { NEXT_PUBLIC_API_URL } from "@/env/env";
import { SnackbarContext } from "@/app/common/context/SnackcbarContext";

export type GetTodoReminder = {
  time?: number;
};

const queryKey = "get-reminder";

export default function Reminder({
  todo_id,
  handleClose,
}: {
  todo_id: number;
  handleClose: () => void;
}) {
  const { data, isLoading } = useQuery({
    queryKey: [queryKey],
    queryFn: async () => {
      const response = await axios.post<GetTodoReminder>(
        `${NEXT_PUBLIC_API_URL}/todo/reminder/id`,
        { todo_id },
        getAuthOptions()
      );
      return response.data;
    },
  });
  if (isLoading) {
    return (
      <IconButton color="default">
        <HourglassTopIcon />
      </IconButton>
    );
  }
  if (!data) {
    return <Typography>Something went wrong...</Typography>;
  }

  return (
    <ReminderContent
      todo_id={todo_id}
      selectedTime={data.time}
      handleClose={handleClose}
    />
  );
}

function ReminderContent(props: {
  selectedTime?: number;
  todo_id: number;
  handleClose: () => void;
}) {
  const [modalOpen, setModalOpen] = useState(false);

  function handleClose() {
    setModalOpen(false);
    props.handleClose();
  }

  return (
    <>
      <IconButton color="default">
        <AccessAlarmIcon
          onClick={(e) => {
            setModalOpen(true);
          }}
        />
      </IconButton>
      <Dialog open={modalOpen} onClose={handleClose}>
        <ReminderDialogContent {...props} handleClose={handleClose} />
      </Dialog>
    </>
  );
}

const presets: Array<{ text: string; generator: () => Dayjs }> = [
  {
    text: "Now",
    generator: () => dateManager(),
  },
  {
    text: "Tonight",
    generator: () => dateManager().hour(20).minute(0).second(0).millisecond(0),
  },
  {
    text: "Tomorrow morning",
    generator: () =>
      dateManager().add(1, "day").hour(8).minute(0).second(0).millisecond(0),
  },
  {
    text: "Weekend",
    generator: () => {
      const today = dateManager();
      const thisSaturday = today
        .weekday(6)
        .hour(11)
        .minute(0)
        .second(0)
        .millisecond(0);
      return today.isSameOrAfter(thisSaturday, "day")
        ? thisSaturday.add(7, "day") // If already past this Saturday, go to next
        : thisSaturday;
    },
  },
];
function ReminderDialogContent({
  selectedTime,
  todo_id,
  handleClose,
}: {
  selectedTime?: number;
  todo_id: number;
  handleClose: () => void;
}) {
  const [time, setTime] = useState<Dayjs | null>(() =>
    selectedTime ? dateManager.unix(selectedTime) : null
  );
  const { onSnackBar } = useContext(SnackbarContext);
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationKey: ["add-reminder"],
    mutationFn: async () => {
      await axios.post(
        `${NEXT_PUBLIC_API_URL}/todo/reminder`,
        { todo_id, time: time ? time.unix() : null },
        getAuthOptions()
      );
    },
    onSuccess: () => {
      if (time !== null) {
        const diff = time.diff(dateManager());
        const durr = dateManager.duration(diff);

        const hours = Math.floor(durr.asHours());
        onSnackBar(`Alarm set in ${hours} hours`);
      }
      queryClient.invalidateQueries({ queryKey: [queryKey] });
      handleClose();
    },
    onError: () => {
      handleClose();
    },
  });
  return (
    <>
      <DialogTitle>{"Enter reminder"}</DialogTitle>
      <DialogContent>
        <Box flexDirection={"column"} display={"flex"} gap={3} pt={2}>
          <DateTimePicker
            slotProps={{
              field: {
                clearable: true,
              },
            }}
            value={time}
            onChange={(t) => {
              setTime(t);
            }}
          />
          <Box>
            {presets.map(({ text, generator }) => {
              return (
                <Button
                  key={text}
                  onClick={() => {
                    setTime(generator());
                  }}
                >
                  {text}
                </Button>
              );
            })}
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={() => mutate()} autoFocus>
          Save
        </Button>
      </DialogActions>
    </>
  );
}
