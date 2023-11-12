import { Stack } from "@mui/material";
import Job, { JobProps } from "./job";

const jobs: JobProps[] = [
  {
    company: "Tiktok Singapore",
    title: "Frontend Engineer",
    image: "tiktok",
    descriptions: [
      `In charge of building a web application for several bank transactions like fixed deposit, cash deposit and withdrawal as part of the BranchConnect project.  BranchConnect is a web application to be used by bank tellers to perform transaction in DBS branches in Singapore.`,
      `Solely responsible for integration of Teller Assist Unit physical device to application using REST API to trigger device actions and event listener to receive events and show corresponding UI.`,
      `Advocate on the usage of reusable front-end components and creating it by communicating with other teams for requirements gathering and maintaining some of the most widely used components throughout BranchConnect. Some examples are Customer Account Search, General Ledger and Cash Denomination user interface.`,
      `Build testable front-end code by using jest and react-testing-library, performing above KPI (80%) with 98% of unit test line coverage score via Sonarqube static code analyzer.`,
      `From times to times, performing tech lead duties such as code review, distribute workload to team members, act as technical representative in software design meetings and production support.`,
      `Serve as a mentor to new software developers in the team.`,
    ],
  },
  {
    company: "DBS Bank",
    title: "Full stack Engineer",
    image: "DBS",
    descriptions: [
      `In charge of building a web application for several bank transactions like fixed deposit, cash deposit and withdrawal as part of the BranchConnect project.  BranchConnect is a web application to be used by bank tellers to perform transaction in DBS branches in Singapore.`,
      `Solely responsible for integration of Teller Assist Unit physical device to application using REST API to trigger device actions and event listener to receive events and show corresponding UI.`,
      `Advocate on the usage of reusable front-end components and creating it by communicating with other teams for requirements gathering and maintaining some of the most widely used components throughout BranchConnect. Some examples are Customer Account Search, General Ledger and Cash Denomination user interface.`,
      `Build testable front-end code by using jest and react-testing-library, performing above KPI (80%) with 98% of unit test line coverage score via Sonarqube static code analyzer.`,
      `From times to times, performing tech lead duties such as code review, distribute workload to team members, act as technical representative in software design meetings and production support.`,
      `Serve as a mentor to new software developers in the team.`,
    ],
  },
];

export default function Experiences() {
  return (
    <Stack p={2} spacing={2}>
      {jobs.map((job) => (
        <Job key={job.company} {...job} />
      ))}
    </Stack>
  );
}
