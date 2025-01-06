import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Stack,
  Typography,
} from "@mui/material";
import ImageWrap from "../../components/image";
import ImageBorder from "../../components/image-border";
import {
  OLD_PORTFOLIO_PROJECTS,
  PERSONAL_PROJECT_PUBLIC,
} from "@/configs/route";

const projects = [
  {
    name: "Habit Tracker App",
    description: "An offline Android app to track daily habit",
    image: "habit_tracker-logo",
    link: "habit-tracker",
  },
  {
    name: "Logistics Website",
    description:
      "A platform for people to share items accross different departments",
    image: "logistics-logo",
    link: "logistics",
  },
  {
    name: "Group Task App",
    description: "Task manager application to delegate tasks in group projects",
    image: "grouptask-logo",
    link: "grouptask",
  },
];

export default function Projects() {
  return (
    <Box
      display={"flex"}
      padding={2}
      sx={{
        backgroundColor: "grey.200",
      }}
    >
      <Stack
        direction="row"
        alignItems={"center"}
        flexWrap={"wrap"}
        useFlexGap
        spacing={4}
      >
        <Card
          sx={{
            flex: 1,
            minWidth: 250,
            maxWidth: 500,
          }}
        >
          <CardHeader
            title={
              <Typography variant="h5">
                My Projects and Learning Journey
              </Typography>
            }
          />
          <CardContent>
            <Typography variant={"body1"}>
              I started programming during the break period between my
              graduation and my first job out of college. I initially came
              across Android development which lead to my first project, Habit
              Tracker. I still ocassionally build Full-Stack web applications
              now!
            </Typography>
          </CardContent>
        </Card>
        <Stack spacing={2}>
          {projects.map((project) => (
            <Stack direction="row" spacing={2} key={project.name}>
              <ImageBorder size={120}>
                <ImageWrap
                  size={100}
                  rounded
                  src={`${PERSONAL_PROJECT_PUBLIC}/${project.image}`}
                />
              </ImageBorder>
              <Stack justifyContent={"center"} spacing={1} flex={1}>
                <Typography variant={"h6"}>{project.name}</Typography>
                <Typography variant={"body1"}>{project.description}</Typography>
                <a href={`${OLD_PORTFOLIO_PROJECTS}/${project.link}`}>
                  <Button size={"small"} variant={"outlined"}>
                    Learn more
                  </Button>
                </a>
              </Stack>
            </Stack>
          ))}
        </Stack>
      </Stack>
    </Box>
  );
}
