"use client";

import List from "@mui/material/List";
import { useState } from "react";
import { Box, Button, ListItemButton, Typography } from "@mui/material";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import axios from "axios";
import { NEXT_PUBLIC_API_URL } from "@/env/env";
import { TodoResponse } from "./types";
import { Group } from "./components/group";
import { useAddTask } from "./components/services";
import { getAuthOptions } from "@/utilities/utils";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Register from "./components/register";

const queryClient = new QueryClient();

function GroupWrapper({ data }: { data: Array<TodoResponse> }) {
  const [groups, setGroups] = useState(data);
  const { mutate } = useAddTask({ parent_task: null }, ({ id }) => {
    setGroups((cur) => [
      ...cur,
      { id, desc: "", created_by: "", is_done: false, todos: [] },
    ]);
  });

  return (
    <>
      {groups.map((grp) => (
        <Group
          key={grp.id}
          grp={grp}
          onDelete={() => {
            setGroups((cur) => cur.filter((item) => item.id !== grp.id));
          }}
        />
      ))}
      <ListItemButton>
        <Button
          onClick={() => {
            mutate();
          }}
        >
          Add Group
        </Button>
      </ListItemButton>
    </>
  );
}

function TodoPage() {
  const { data, isLoading } = useQuery({
    queryKey: ["todo-list"],
    queryFn: async () => {
      const response = await axios.get<Array<TodoResponse>>(
        `${NEXT_PUBLIC_API_URL}/todo/list`,
        getAuthOptions()
      );
      return response.data;
    },
  });

  if (isLoading) {
    return <Typography>Loading ...</Typography>;
  }

  if (!data) {
    return <Typography>Error!</Typography>;
  }

  return (
    <Box flexDirection={"column"} p={2}>
      <Box width={"fit-content"} ml="auto" pr={1}>
        <Register />
      </Box>
      <List
        sx={{ width: "100%", maxWidth: "1000px", bgcolor: "background.paper" }}
        component="nav"
      >
        <GroupWrapper data={data} />
      </List>
    </Box>
  );
}

export default function Page() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <QueryClientProvider client={queryClient}>
        <TodoPage />
      </QueryClientProvider>
    </LocalizationProvider>
  );
}
