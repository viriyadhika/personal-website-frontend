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
      `Built ETL pipelines and CI/CD deployment scripts to centralize financial instruments data processing from
multiple sources using Amazon Web Services and Java Spring Boot, deployed on Kubernetes, and used by major
downstream applications company-wide`,
      `Enhanced a highly concurrent FastAPI Python application for data reconciliation to maintain data quality across
100+ tables, reducing runtime of data quality scripts from 3 days to 4 hours per run, enabling checks to run
multiple times daily instead of weekly.`,
      `Developed a Python tool to parse requirement specifications and generate boilerplate code, improving accuracy
and saving developer hours.`,
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
      `Created a React webpage within the TikTok App, enabling creators to track their TikTok Shop affiliate performance, accessed by millions of monthly active users.`,
      `Designed and implemented new data dashboards in shop.tiktok.com, partner.tiktokshop.com, and affiliate.tiktok.com. Integrated content diagnostic features in the TikTok Shop seller app by providing creators with content inspiration.`,
      `As the front-end in charge for partner.tiktokshop.com data dashboard, reviewed pull requests, enabled greyscale release through CI/CD script, and addressed periodic user feedback, achieving high user growth in new markets.`,
      `Leveraged internal build tools and infrastructure to support multi-region deployments. Utilized front-end data collection frameworks and Apache Hive interface to develop production monitoring dashboards.`,
      `Optimize a smooth close to native app experience by using animation library such as Framer motion`,
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
      `Leveraged Camunda with Java Spring Boot to orchestrate workflows and manage subsystem API calls in a nationwide branch banking system designed for bank tellers and managers.`,
      `Integrated the Teller Assist Unit physical device with the application, using REST API to trigger device actions, RabbitMQ and WebSocket for real-time event communication.`,
      `Advocated for reusable front-end components by gathering cross-team requirements and maintaining widely used components, reducing development time for common components from one week to one day.`,
      `Built testable front-end code using Jest and React Testing Library and back-end code with JUnit and Mockito, achieving 98% unit test line coverage as measured by SonarQube static code analysis.`,
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
