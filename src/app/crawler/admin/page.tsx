"use client";
import { post } from "@/app/common/hooks/fetcher";
import useAPI from "@/app/common/hooks/use-api";
import { Box, Button, CircularProgress, TextField } from "@mui/material";
import { useForm } from "react-hook-form";

enum BatchField {
  LOCATION = "location",
  ROLE = "role",
}

export type BatchForm = {
  [key in BatchField]: string;
};

export default function Admin() {
  const { callAPI, isAPIRunning } = useAPI(async (request: BatchForm) => {
    return post("/crawler/batch", {
      location: request.location,
      keywords: request.role,
    });
  });
  const { register, handleSubmit } = useForm<BatchForm>();

  return (
    <Box display={"flex"} justifyContent={"center"}>
      <Box display={"block"}>
        <form
          onSubmit={handleSubmit((result) => {
            callAPI(result, () => {
              alert("success!");
            });
          })}
        >
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
          <div>
            <Button variant="contained" type={"submit"}>
              Submit
            </Button>
          </div>
        </form>
      </Box>
    </Box>
  );
}
