"use client";
import { APIHandlerProvider } from "@/app/common/context/APIContext";
import { post } from "@/app/common/hooks/fetcher";
import useAPI from "@/app/common/hooks/use-api";
import { Box, Button, Card, CircularProgress, TextField } from "@mui/material";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

enum BatchField {
  LOCATION = "location",
  ROLE = "role",
}

export type BatchForm = {
  [key in BatchField]: string;
};

function Admin() {
  const { callAPI, isAPIRunning } = useAPI(async (request: BatchForm) => {
    return post("/crawler/batch", {
      location: request.location,
      keywords: request.role,
    });
  });
  const { register, handleSubmit } = useForm<BatchForm>();

  const router = useRouter();

  return (
    <Box display={"flex"} justifyContent={"center"}>
      <form
        onSubmit={handleSubmit((result) => {
          callAPI(
            result,
            () => {
              alert("success!");
            },
            (e) => {
              if (e?.response?.status === 401) {
                router.push("/auth/login");
              }
            }
          );
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
