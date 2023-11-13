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
import { PERSONAL_PROJECT_PUBLIC } from "@/configs/route";

const projects = [
  {
    name: "Logistics Website",
    description: "A platform for people to share items",
    image: "logistics-logo",
  },
  {
    name: "Group Task App",
    description: "Task manager application for group projects",
    image: "grouptask-logo",
  },
  {
    name: "Habit Tracker App",
    description: "Android app to track daily habit",
    image: "habit_tracker-logo",
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
        <Card sx={{ flex: 1, minWidth: 250, maxWidth: 500 }}>
          <CardHeader
            title={
              <Typography variant="h5">
                My Projects and Learning Journey
              </Typography>
            }
          />
          <CardContent>
            <Typography>
              I started programming during the break period between my
              graduation and my first job out of college. Due to COVID-19 has
              forced everyone indoor. While searching for something to do, I
              came across Android development which lead to my first project,
              Habit Tracker. I continue programming afterwards, building a few
              more projects before landing myself a job in tech!
            </Typography>
          </CardContent>
        </Card>
        <Stack spacing={2}>
          {projects.map((project) => (
            <Stack direction="row" spacing={2} key={project.name}>
              <ImageBorder size={140}>
                <ImageWrap
                  size={120}
                  rounded
                  src={`${PERSONAL_PROJECT_PUBLIC}/${project.image}`}
                />
              </ImageBorder>
              <Stack justifyContent={"center"} spacing={1} flex={1}>
                <Typography variant={"h5"}>{project.name}</Typography>
                <Typography>{project.description}</Typography>
                <Button variant={"outlined"}>Learn more</Button>
              </Stack>
            </Stack>
          ))}
        </Stack>
      </Stack>
    </Box>
  );
}
