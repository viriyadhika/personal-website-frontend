import { Box, Stack, Typography } from "@mui/material";
import Content from "./content";

export default function Skills() {
  return (
    <Box p={2}>
      <Stack>
        <Typography variant={"h4"}>Skills</Typography>
        <Typography>
          These are some of the skills I have acquired throughout my experience
          working and building things
        </Typography>
        <Content />
      </Stack>
    </Box>
  );
}
