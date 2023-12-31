import { Stack, Typography } from "@mui/material";
import Job, { JobProps } from "./job";
import { ForwardedRef, forwardRef } from "react";

const jobs: JobProps[] = [
  {
    company: "Tiktok Singapore",
    title: "Frontend Engineer",
    image: "tiktok",
    date: "Jul 2023 - Present",
    descriptions: [
      `A part of data compass team in Tiktok Shop, which provides statistics and metrics to TikTok Shop creators and partners about their content monetary and non-monetary performance`,
      `Built a React webpage embedded in TikTok App to display TikTok Shop data used by over 1 million unique weekly active users`,
      `Created new data dashboard and integrated diagnosis features in Tiktok Seller center mobile app, partner.tiktokshop.com and affiliate.tiktok.com which is used by tens of thousands of unique users daily`,
      `Use TikTok internal toolings such as build tools and infrastructure as well as different frontend development and Micro-Frontends frameworks to perform scalable deployment to multiple regions and countries`,
      `Optimize a smooth close to native app experience by using animation library such as Framer motion`,
    ],
    skills: [
      {
        skillSrc: "javascript",
        name: "Javascript",
      },
      {
        skillSrc: "react",
        name: "React",
      },
      {
        skillSrc: "redux",
        name: "Redux",
      },
      {
        skillSrc: "cdn",
        name: "CDN",
      },
      {
        skillSrc: "cloud",
        name: "CI/CD",
      },
    ],
  },
  {
    company: "DBS Bank",
    title: "Full stack Engineer",
    image: "DBS",
    date: "Jul 2021 - Jul 2023",
    descriptions: [
      `In charge of building a web application for several bank transactions like fixed deposit, cash deposit and withdrawal as part of the BranchConnect project.  BranchConnect is a web application to be used by bank tellers to perform transaction in DBS branches in Singapore.`,
      `Solely responsible for integration of Teller Assist Unit physical device to application using REST API to trigger device actions and event listener to receive events and show corresponding UI.`,
      `Advocate on the usage of reusable front-end components and creating it by communicating with other teams for requirements gathering and maintaining some of the most widely used components throughout BranchConnect. Some examples are Customer Account Search, General Ledger and Cash Denomination user interface.`,
      `Build testable front-end code by using jest and react-testing-library, performing above KPI (80%) with 98% of unit test line coverage score via Sonarqube static code analyzer.`,
      `From times to times, performing tech lead duties such as code review, distribute workload to team members, act as technical representative in software design meetings and production support.`,
      `Serve as a mentor to new software developers in the team.`,
    ],
    skills: [
      {
        skillSrc: "java",
        name: "Java",
      },
      {
        skillSrc: "springboot",
        name: "Spring boot",
      },
      {
        skillSrc: "mockito",
        name: "Mockito",
      },
      {
        skillSrc: "kibana",
        name: "Kibana",
      },
      {
        skillSrc: "mariadb",
        name: "Maria DB",
      },
      {
        skillSrc: "javascript",
        name: "Javascript",
      },
      {
        skillSrc: "react",
        name: "React",
      },
      {
        skillSrc: "redux",
        name: "Redux",
      },
      {
        skillSrc: "jest",
        name: "Jest",
      },
      {
        skillSrc: "react-hook-form",
        name: "React hook form",
      },
    ],
  },
  {
    company: "Micron Technology",
    title: "Production Engineer",
    image: "micron",
    date: "Nov 2020 - Jul 2021",
    descriptions: [
      `Led and supervised 9 team members to maximize production line performance and efficiency in order to meet daily wafer production target`,
      `Use SQL and Tableau to build an interactive dashboard which automate daily production line performance reporting`,
    ],
    skills: [
      {
        skillSrc: "microsoft-sql",
        name: "Microsoft SQL",
      },
      {
        skillSrc: "tableau",
        name: "Tableau",
      },
    ],
  },
];

function Experiences(_: {}, ref: ForwardedRef<HTMLDivElement>) {
  return (
    <Stack p={2} spacing={2} ref={ref}>
      <Typography variant={"h4"}>Work experiences</Typography>
      <Stack
        direction={"row"}
        spacing={2}
        justifyContent={"center"}
        useFlexGap
        flexWrap={"wrap"}
      >
        {jobs.map((job) => (
          <Job key={job.company} {...job} />
        ))}
      </Stack>
    </Stack>
  );
}

export default forwardRef(Experiences);
