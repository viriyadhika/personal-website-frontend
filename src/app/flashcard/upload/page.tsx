"use client";

import { useState } from "react";
import axios from "axios";
import { NEXT_PUBLIC_API_URL } from "@/env/env";
import { Box, Button, Card, Input, Typography } from "@mui/material";
import { getAuthOptions } from "@/utilities/utils";
import usePushLogin from "@/app/common/hooks/use-push-login";

export default function UploadFile() {
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { handleError } = usePushLogin();
  return (
    <Box
      height={"100vh"}
      width={"100%"}
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <form
        method="POST"
        encType="multipart/form-data"
        onSubmit={async (e) => {
          e.preventDefault();
          if (file) {
            const formData = new FormData();
            formData.append("file", file);
            setIsLoading(true);
            try {
              await axios.post(
                `${NEXT_PUBLIC_API_URL}/flashcard/upload_file`,
                formData,
                getAuthOptions()
              );
            } catch (e) {
              console.error(e);
              handleError(e);
            } finally {
              setIsLoading(false);
            }
          }
        }}
      >
        <Card style={{ padding: 16 }}>
          <Box
            display={"flex"}
            alignItems={"start"}
            justifyContent={"center"}
            flexDirection={"column"}
            gap={2}
          >
            <Typography variant="h6">
              <label htmlFor="formFile">Choose csv file to upload</label>
            </Typography>
            <Input
              inputComponent={"input"}
              inputProps={{ accept: ".csv" }}
              type="file"
              name="file"
              id="formFile"
              onChange={(e: any) => {
                if (e.target.files) {
                  setFile(e.target.files[0]);
                }
              }}
            />
            <Button fullWidth variant="outlined" type="submit" value="Upload">
              Upload
            </Button>
            {isLoading && <div role="status"></div>}
          </Box>
        </Card>
      </form>
    </Box>
  );
}
