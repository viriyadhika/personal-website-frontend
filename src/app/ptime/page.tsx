"use client";
import {
  Box,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { APIHandlerProvider } from "../common/context/APIContext";
import { useEffect, useState } from "react";
import useAPI from "../common/hooks/use-api";
import axios from "axios";
import { PtimeResponse } from "./types";
import { NEXT_PUBLIC_API_URL } from "@/env/env";

const nonCtry = " ";
const options = ["ID", "SG", "CA", nonCtry];

export default function PtimePage() {
  const [option, setOption] = useState(options[0]);
  const { callAPI, result } = useAPI<{ ctry: string }, Array<PtimeResponse>>(
    async (request) => {
      const response = await axios.post<Array<PtimeResponse>>(
        `${NEXT_PUBLIC_API_URL}/crawler/ptime`,
        request
      );
      return response.data;
    }
  );

  useEffect(() => {
    callAPI({ ctry: option }, () => {});
  }, [option]);

  if (!result) {
    return <div>Loading ...</div>;
  }

  return (
    <APIHandlerProvider>
      <Box
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        height={"100vh"}
        width={"100%"}
        flexDirection={"column"}
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
              {opt === nonCtry ? "No Ctry" : opt}
            </MenuItem>
          ))}
        </Select>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                {["V Type", "Date", "P time"].map((title) => {
                  return <TableCell key={title}>{title}</TableCell>;
                })}
              </TableRow>
            </TableHead>
            <TableBody>
              {result.map(({ v_type, date, ptime }) => (
                <TableRow
                  key={v_type + date}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>{v_type}</TableCell>
                  <TableCell>{date}</TableCell>
                  <TableCell>{ptime}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </APIHandlerProvider>
  );
}
