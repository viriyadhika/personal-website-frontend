"use client";
import { NEXT_PUBLIC_API_URL } from "@/env/env";
import axios from "axios";
import { Batch, Status } from "../types";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Link from "next/link";
import useAPI from "@/app/common/hooks/use-api";
import { useEffect } from "react";
import { noop } from "@/utilities/utils";

async function getData() {
  const res = await axios.get<Array<Batch>>(
    `${NEXT_PUBLIC_API_URL}/crawler/batch`
  );

  return res.data;
}

function mapStatusToStr(status: Status) {
  const statusMap: Record<Status, string> = {
    [Status.BATCH_RUNNING]: "Running",
    [Status.COMPLETED]: "Completed",
    [Status.QUEUING]: "Queuing",
  };

  return statusMap[status];
}

export default function Batches() {
  const { callAPI, isAPIRunning, result } = useAPI(getData);

  useEffect(() => {
    callAPI(undefined, noop);
  }, []);

  if (isAPIRunning || !result) {
    return <div>Loading</div>;
  }

  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              {["Batch ID", "Search", "Link"].map((title) => {
                return <TableCell key={title}>{title}</TableCell>;
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {result.map(({ batch_id, status }) => (
              <TableRow
                key={batch_id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {batch_id}
                </TableCell>
                <TableCell component="th" scope="row">
                  {mapStatusToStr(status)}
                </TableCell>
                <TableCell>
                  <Link
                    href={`/crawler/batches/${encodeURIComponent(batch_id)}`}
                  >
                    Details
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
