import { API_URL } from "@/env/env";
import axios from "axios";
import { Job } from "../../types";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

async function getData({ id }: { id: string }) {
  const res = await axios.post<Array<Job>>(`${API_URL}/crawler/batch/details`, {
    id,
  });

  return res.data;
}

export default async function Batches({
  params: { id },
}: {
  params: { id: string };
}) {
  const data = await getData({ id: decodeURIComponent(id) });
  return (
    <div>
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
            {data.map(({ job_id, employee, company }, idx) => (
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
                  {job_id}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
