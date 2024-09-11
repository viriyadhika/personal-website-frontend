"use client";

import { Box, Button, Card, MenuItem, Select, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import useAPI from "../common/hooks/use-api";
import { APIHandlerProvider } from "../common/context/APIContext";
import axios from "axios";
import { NEXT_PUBLIC_API_URL } from "@/env/env";
import { noop } from "@/utilities/utils";
import { QuestionAnswer } from "./types";
import FlashcardContent from "./flashcard-content";

function getData(request: { file_name: string }) {
  return axios.post<Array<QuestionAnswer>>(
    `${NEXT_PUBLIC_API_URL}/flashcard/get_data`,
    request
  );
}

function FlashcardCard({ option }: { option: string }) {
  const { callAPI, result, isAPIRunning } = useAPI(getData);

  useEffect(() => {
    callAPI({ file_name: option }, noop);
  }, [option]);

  if (isAPIRunning) {
    return <Typography variant="body1">Loading</Typography>;
  }

  if (!result?.data) {
    return <Typography variant="body1">No result</Typography>;
  }

  return <FlashcardContent initialUnusedQuestion={result.data} />;
}

function FlashcardOptionsWithContent({
  options,
  onDeleted,
}: {
  options: string[];
  onDeleted: () => void;
}) {
  const [option, setOption] = useState(options[0]);

  const { callAPI } = useAPI(async (request) => {
    const _ = await axios.post<Array<QuestionAnswer>>(
      `${NEXT_PUBLIC_API_URL}/flashcard/delete_option`,
      request
    );
  });

  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"center"}
      alignItems={"center"}
      gap={2}
    >
      <Select
        value={option}
        onChange={(e) => {
          setOption(e.target.value);
        }}
      >
        {options.map((opt) => (
          <MenuItem key={opt} value={opt}>
            {opt}
          </MenuItem>
        ))}
      </Select>
      <Button
        color="error"
        onClick={() => {
          callAPI({ file_name: option }, onDeleted);
        }}
      >
        Delete
      </Button>
      <Card style={{ padding: 24 }}>
        <FlashcardCard option={option} />
      </Card>
    </Box>
  );
}

function getOptions() {
  return axios.post<Array<string>>(
    `${NEXT_PUBLIC_API_URL}/flashcard/get_options`
  );
}

function FlashcardClient() {
  const { callAPI, result, isAPIRunning } = useAPI(getOptions);

  useEffect(() => {
    callAPI({}, noop);
  }, []);

  if (isAPIRunning) {
    return null;
  }

  if (!result?.data || result?.data.length === 0) {
    return <Typography variant="body1">Nothing uploaded</Typography>;
  }

  return (
    <FlashcardOptionsWithContent
      options={result.data}
      onDeleted={() => callAPI({}, noop)}
    />
  );
}

export default function FlashcardPage() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <APIHandlerProvider>
      <Box
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        height={"100vh"}
        width={"100%"}
      >
        {isClient && <FlashcardClient />}
      </Box>
    </APIHandlerProvider>
  );
}
