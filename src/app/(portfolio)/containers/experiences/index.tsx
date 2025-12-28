import { Stack, Typography } from "@mui/material";
import Job, { JobProps } from "./job";
import { ForwardedRef, forwardRef } from "react";

const jobs: JobProps[] = [
  {
    company: "GIC Pte. Ltd.",
    title: "Data Engineer",
    image: "gic",
    date: "Aug 2024 - Present",
    descriptions: [
      `Built ETL pipelines and CI/CD deployment scripts to centralize financial instruments data processing from multiple sources using Amazon Web Services and Java Spring Boot, deployed on Kubernetes, and used by major downstream applications company-wide.`,
      `Enhanced a highly concurrent FastAPI Python application for data reconciliation to maintain data quality across 100+ tables, reducing runtime of data quality scripts from 3 days to 4 hours per run, enabling checks to run multiple times daily instead of weekly.`,
      `Developed a Python tool to parse requirement specifications and automate code generation.`,
      `Developed a full-stack web application as an internal tool for production support.`,
    ],
    skills: [
      {
        skillSrc: "python",
        name: "Python",
      },
      {
        skillSrc: "fastapi",
        name: "FastAPI",
      },
      {
        skillSrc: "java",
        name: "Java",
      },
      {
        skillSrc: "springboot",
        name: "Spring boot",
      },
      {
        skillSrc: "aws",
        name: "AWS",
      },
      {
        skillSrc: "kubernetes",
        name: "Kubernetes",
      },
      {
        skillSrc: "typescript",
        name: "TypeScript",
      },
      {
        skillSrc: "react",
        name: "React",
      },
    ],
  },
  {
    company: "Tiktok Singapore",
    title: "Frontend Engineer",
    image: "tiktok",
    date: "Jul 2023 - Aug 2024",
    descriptions: [
      `Created and maintained a React webpage embedded in TikTok App used by millions of monthly active users.`,
      `Created new data dashboards and integrated diagnosis features in shop.tiktok.com, partner.tiktokshop.com and affiliate.tiktok.com. As the frontend in charge for partner data dashboard, reviewed pull requests by other contributors, improved CI/CD automation and actively addressed user feedback to the platform.`,
      `Learnt and utilize TikTok internal tooling, build tools and infrastructure as well as different frontend development and Micro-Frontends frameworks to perform scalable deployment and production monitoring on a massive scale to multiple regions and countries.`,
      `Utilized front-end data collection frameworks and Apache Hive to develop production monitoring dashboard and support frontend A/B testing.`,
    ],
    skills: [
      {
        skillSrc: "typescript",
        name: "TypeScript",
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
    title: "Full Stack Engineer",
    image: "DBS",
    date: "Jul 2021 - Jul 2023",
    descriptions: [
      `In charge of building a web application for several bank transactions like fixed deposit, cash deposit and withdrawal as part of the BranchConnect project. BranchConnect is a web application to be used by bank tellers to perform transaction in DBS branches in Singapore.`,
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
        skillSrc: "typescript",
        name: "TypeScript",
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
