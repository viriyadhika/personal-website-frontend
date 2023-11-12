import { Box, Button, Stack, Typography } from "@mui/material";
import ImageWrap from "../../components/image";
import ImageBorder from "../../components/image-border";

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
        spacing={4}
      >
        <Box
          width={"20%"}
          minWidth={200}
          p={2}
          sx={{ backgroundColor: "grey.50" }}
        >
          <Stack spacing={2}>
            <Typography variant="h4">
              My Projects and Learning Journey
            </Typography>
            <Typography>
              I started programming during the break period between my
              graduation and my first job out of college. Due to COVID-19 has
              forced everyone indoor. While searching for something to do, I
              came across Android development which lead to my first project,
              Habit Tracker. I continue programming afterwards, building a few
              more projects before landing myself a job in tech!
            </Typography>
          </Stack>
        </Box>
        <Stack spacing={2}>
          {projects.map((project) => (
            <Stack direction="row" spacing={1} key={project.name}>
              <ImageBorder size={140}>
                <ImageWrap size={120} rounded name={project.image} />
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
