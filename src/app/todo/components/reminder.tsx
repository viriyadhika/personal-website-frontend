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
import { useState } from "react";
import { DateTimePicker } from "@/app/common/components/date-picker";
import { dateManager } from "@/app/mock-generator/utils/utils";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import HourglassTopIcon from "@mui/icons-material/HourglassTop";
import axios from "axios";
import { getAuthOptions } from "@/utilities/utils";
import { Dayjs } from "dayjs";
import { NEXT_PUBLIC_API_URL } from "@/env/env";

export type GetTodoReminder = {
  time?: number;
};

const queryKey = "get-reminder";

export default function Reminder({ todo_id }: { todo_id: number }) {
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

  return <ReminderContent todo_id={todo_id} selectedTime={data.time} />;
}

function ReminderContent(props: { selectedTime?: number; todo_id: number }) {
  const [modalOpen, setModalOpen] = useState(false);

  function handleClose() {
    setModalOpen(false);
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
        <Box pt={2}>
          <DateTimePicker
            value={time}
            onChange={(t) => {
              setTime(t);
            }}
          />
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
