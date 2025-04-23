import { NEXT_PUBLIC_API_URL } from "@/env/env";
import {
  Box,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import { getAuthOptions } from "@/utilities/utils";

export default function Register() {
  const [modalOpen, setModalOpen] = useState(false);
  const { data } = useQuery({
    queryKey: ["get-otp"],
    queryFn: async () => {
      const response = await axios.get<string>(
        `${NEXT_PUBLIC_API_URL}/auth/otp`,
        getAuthOptions()
      );
      return response.data;
    },
  });
  return (
    <>
      <IconButton color="success">
        <SmartToyIcon
          onClick={(e) => {
            setModalOpen(true);
          }}
        />
      </IconButton>
      <Dialog open={modalOpen} onClose={() => setModalOpen(false)}>
        <DialogTitle>{"Integrate with reminder bot"}</DialogTitle>
        <DialogContent>
          <Box pt={2}>
            <DialogContentText>
              1. Add the bot <strong>@todoapp_reminder_bot</strong>
            </DialogContentText>
            <DialogContentText>
              2. Command <strong>/register</strong>
            </DialogContentText>
            <DialogContentText>
              3. Key in your secret OTP: <strong>{data ?? "Loading..."}</strong>
            </DialogContentText>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
}
