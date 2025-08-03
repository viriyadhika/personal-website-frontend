"use client";
import { NEXT_PUBLIC_API_URL } from "@/env/env";
import axios from "axios";
import { Batch } from "../types";
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
import { APIHandlerProvider } from "@/app/common/context/APIContext";
import { useSearchBatch } from "../services/use-search-batch";
import { Button } from "@mui/material";
import dayjs from "dayjs";

async function getData() {
  const res = await axios.get<Array<Batch>>(
    `${NEXT_PUBLIC_API_URL}/crawler/batch`
  );

  return res.data;
}

function Batches() {
  const { callAPI, isAPIRunning, result } = useAPI(getData);
  const { search } = useSearchBatch();

  useEffect(() => {
    callAPI(undefined, noop);
  }, [callAPI]);

  if (isAPIRunning || !result) {
    return <div>Loading</div>;
  }

  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              {["Batch ID", "Last Updated", "Refresh", "Link"].map((title) => {
                return <TableCell key={title}>{title}</TableCell>;
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {result.map(
              ({ batch_id, last_updated, job_location, keywords }) => (
                <TableRow
                  key={batch_id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {batch_id}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {dayjs(last_updated.slice(0, 23)).format(
                      "YYYY-MM-DD HH:mm"
                    )}
                  </TableCell>
                  <TableCell>
                    <Button
                      onClick={() => {
                        search({
                          location: job_location,
                          role: keywords,
                        });
                      }}
                      color="primary"
                    >
                      Refresh
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Link
                      href={`/crawler/batches/${encodeURIComponent(batch_id)}`}
                    >
                      Details
                    </Link>
                  </TableCell>
                </TableRow>
              )
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default function BatchesWithWrapper() {
  return (
    <APIHandlerProvider>
      <Batches />
    </APIHandlerProvider>
  );
}
