"use client";

import { NEXT_PUBLIC_API_URL } from "@/env/env";
import { getAuthOptions } from "@/utilities/utils";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import { TodoResponse } from "../types";
import axios from "axios";

// No need for `result` anymore, we are using API data!

function Journal() {
  const { data } = useQuery<TodoResponse[]>({
    queryKey: ["todo-journal"],
    queryFn: async () => {
      const response = await axios.get<TodoResponse[]>(
        `${NEXT_PUBLIC_API_URL}/todo/journal`,
        getAuthOptions()
      );
      return response.data;
    },
  });

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="todo table">
        <TableHead>
          <TableRow>
            {["Done Date", "Description"].map((title) => (
              <TableCell key={title}>{title}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.map(({ id, desc, done_date, is_done }) => (
            <TableRow
              key={id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell>{done_date}</TableCell>
              <TableCell>{desc}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: 0 } },
});

export default function Page() {
  return (
    <QueryClientProvider client={queryClient}>
      <Journal />
    </QueryClientProvider>
  );
}
