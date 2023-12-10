import { Box, Stack, Typography } from "@mui/material";
import Content from "./content";
import { ForwardedRef, forwardRef } from "react";

function Skills(_: {}, ref: ForwardedRef<HTMLDivElement>) {
  return (
    <Box p={2} ref={ref}>
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

export default forwardRef(Skills);
