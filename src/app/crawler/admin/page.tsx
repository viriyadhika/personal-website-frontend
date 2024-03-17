"use client";
import { APIHandlerProvider } from "@/app/common/context/APIContext";
import { Box, Button, Card, CircularProgress, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import {
  BatchField,
  BatchForm,
  useSearchBatch,
} from "../services/use-search-batch";

function Admin() {
  const { isAPIRunning, search } = useSearchBatch();

  const { register, handleSubmit } = useForm<BatchForm>();

  return (
    <Box display={"flex"} justifyContent={"center"}>
      <form
        onSubmit={handleSubmit((result) => {
          search(result);
        })}
      >
        <Card variant="outlined" sx={{ padding: 3 }}>
          <Box display={"flex"} flexDirection={"column"} gap={2}>
            <div>
              <TextField
                {...register(BatchField.LOCATION, { required: true })}
                required={true}
                label="Location"
                variant="outlined"
              />
            </div>
            <div>
              <TextField
                {...register(BatchField.ROLE, { required: true })}
                required={true}
                label="Role"
                variant="outlined"
              />
            </div>
            {isAPIRunning && <CircularProgress />}
            <Button variant="contained" type={"submit"}>
              Submit
            </Button>
          </Box>
        </Card>
      </form>
    </Box>
  );
}

export default function AdminWithWrapper() {
  return (
    <APIHandlerProvider>
      <Admin />
    </APIHandlerProvider>
  );
}
