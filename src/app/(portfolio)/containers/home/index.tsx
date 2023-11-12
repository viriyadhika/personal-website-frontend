import { Box, Button, Stack, Typography } from "@mui/material";
import ImageWrap from "../../components/image";
import ImageBorder from "../../components/image-border";

export default function Home() {
  return (
    <Box
      height={"100vh"}
      display={"flex"}
      alignItems={"center"}
      boxSizing={"border-box"}
      padding={2}
      sx={{
        backgroundColor: "grey.200",
      }}
    >
      <ImageWrap size={215} rounded name={"self-pic"} />
      <Stack padding={4} spacing={4}>
        <Stack>
          <Typography variant={"h1"}>Hello,</Typography>
          <Typography variant={"h1"}>I&apos;m Viriyadhika</Typography>
          <Typography variant={"h5"}>
            I&apos;m a Software Engineer currently based in Singapore.
          </Typography>
          <Typography variant={"h5"}>
            I enjoy building cool web applications.
          </Typography>
        </Stack>
        <Stack direction="row" spacing={2}>
          {["linkedin", "github", "gmail"].map((name) => (
            <ImageBorder key={name} size={50}>
              <ImageWrap size={30} name={name} />
            </ImageBorder>
          ))}
        </Stack>
        <Button variant="outlined">See my experiences</Button>
      </Stack>
    </Box>
  );
}
