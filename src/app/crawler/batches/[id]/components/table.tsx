import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useEffect } from "react";
import useAPI from "@/app/common/hooks/use-api";
import { NEXT_PUBLIC_API_URL } from "@/env/env";
import axios from "axios";
import { Job } from "@/app/crawler/types";
import { Chip, Stack } from "@mui/material";

async function getData({
  id,
  timestamp,
  comparison_timestamp,
}: {
  id: string;
  timestamp: number;
  comparison_timestamp: number;
}) {
  const res = await axios.post<Array<Job>>(
    `${NEXT_PUBLIC_API_URL}/crawler/batch/details`,
    {
      id,
      timestamp,
      comparison_timestamp,
    }
  );

  return res.data;
}

export default function JobTable({
  id,
  current,
  comparison,
}: {
  id: string;
  current: number;
  comparison: number;
}) {
  const { result, isAPIRunning, callAPI } = useAPI(getData);

  useEffect(() => {
    callAPI(
      {
        id: decodeURIComponent(id),
        timestamp: current,
        comparison_timestamp: comparison,
      },
      () => {}
    );
  }, [id, callAPI, current, comparison]);

  if (isAPIRunning || !result) {
    return <div>Loading...</div>;
  }

  return (
    <Stack gap={2}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              {["No.", "Employee", "Company", "Job"].map((title) => {
                return <TableCell key={title}>{title}</TableCell>;
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {result.map(
              ({ job_id, employee, company, job_name, is_new }, idx) => (
                <TableRow
                  key={job_id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {idx}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {employee}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {company}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {is_new ? (
                      <Stack direction={"row"} gap={2}>
                        {job_name}
                        <Chip label={"New!"} color="success" />
                      </Stack>
                    ) : (
                      job_name
                    )}
                  </TableCell>
                </TableRow>
              )
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Stack>
  );
}
