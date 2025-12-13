import { Box, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import ImageWrap from "../../components/image";
import { PORTFOLIO_PUBLIC } from "@/configs/route";
import ImageBorder from "../../components/image-border";
import Achievement, { AchievementInfo } from "./achievement";
import { ForwardedRef, forwardRef } from "react";

const achievements: AchievementInfo[] = [
  {
    title: "Courses",
    contents: [
      {
        title: "IT5003 - Data Structures and Algorithms",
        date: "Feb 2024 - Apr 2023",
        description: "3 Months courses on Data Structure and Algorithms",
      },
      {
        title: "IT5002 - Computer Systems and Applications",
        date: "Jul 2023 - Dec 2023",
        description:
          "6 Months courses learning low level programming language (Assembly) and internal working of Operating Systems",
      },
      {
        title:
          "DSA5841, DSA5842, DSA5843 - Learning from Data: Decision Trees, Support Vector Machines and Neural Networks",
        date: "Jul 2021 - Dec 2021",
        description:
          "Learn the fundamentals of Machine Learning and 3 examples of machine learning models in R Studio. The final project is to implement a Convolutional Neural Network model to differentiate pictures of cats and dogs",
      },
      {
        title: "CS2030 - Programming Methodology II",
        date: "Jan 2018 - Jun 2018",
        description:
          "6 Months courses learning about the basic of Object Oriented Programming and Functional Programming in Java",
      },
    ],
  },
  {
    title: "Academic Awards",
    contents: [
      {
        title: "Material Research Society Singapore Medal",
        date: "Apr 2020",
        description:
          "The best Undergraduate Thesis in the Material Science cohort of 2020",
      },
      {
        title:
          "Dean's List AY 2017/2018 Semester 1 and AY 2018/2019 Semester 2",
        date: "Dec 2017 and Jul 2019",
        description: "Top 5% of students in the Material Science Department",
      },
      {
        title: "ASEAN Undergraduate Scholarship",
        date: "Jul 2016 - Apr 2020",
        description:
          "Full scholarship to take a degree in National University of Singapore with annual allowances",
      },
      {
        title: "International Chemistry Olympiad (IChO) Azerbaijan 2015",
        date: "Jan 2015",
        description:
          "Went through Indonesian National Science Olympiad where 4 people are selected out of thousands of students",
      },
    ],
  },
  {
    title: "Publications",
    contents: [
      {
        title: "Journal of Physics D: Applied Physics",
        date: "Jun 2021",
        description:
          'Contribute to academic paper titled "Intermixing induced anisotropy variations in CoB-based chiral multilayer films"',
        link: "https://iopscience.iop.org/article/10.1088/1361-6463/ac09b6",
      },
    ],
  },
];

function Schools() {
  return (
    <Stack gap={2}>
      <Stack
        direction={"row"}
        alignItems={"center"}
        useFlexGap
        flexWrap={"wrap"}
        gap={2}
      >
        <Box display={"flex"} justifyContent="center">
          <ImageBorder size={120}>
            <ImageWrap size={100} rounded src={`${PORTFOLIO_PUBLIC}/UofT`} />
          </ImageBorder>
        </Box>
        <Box minWidth={250}>
          <Typography variant={"h5"}>
            University of Toronto
          </Typography>
          <Typography variant="h6">Master of Science in Applied Computing (Ongoing)</Typography>
        </Box>
      </Stack>
      <Stack
        direction={"row"}
        alignItems={"center"}
        useFlexGap
        flexWrap={"wrap"}
        gap={2}
      >
        <Box display={"flex"} justifyContent="center">
          <ImageBorder size={120}>
            <ImageWrap size={100} rounded src={`${PORTFOLIO_PUBLIC}/NUS`} />
          </ImageBorder>
        </Box>
        <Box minWidth={250}>
          <Typography variant={"h5"}>
            National University of Singapore
          </Typography>
          <Typography variant="h6">Bachelor of Engineering</Typography>
          <Typography variant="body1">
            Materials Science and Engineering with Honours (Highest Distinction)
          </Typography>
          <Typography variant="body1">
            Cumulative Average Point: 4.77 / 5.00
          </Typography>
        </Box>
      </Stack>
    </Stack>
  )
}

function Education(_: {}, ref: ForwardedRef<HTMLDivElement>) {
  return (
    <Stack p={2} gap={2} ref={ref}>
      <Typography variant={"h4"}>Education & Achievement</Typography>
      <Schools />
      <Box minWidth={300}>
        {achievements.map((achievement) => (
          <Achievement key={achievement.title} achievement={achievement} />
        ))}
      </Box>
    </Stack>
  );
}

export default forwardRef(Education);
