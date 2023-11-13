import { Box, Button, Stack, Typography } from "@mui/material";
import ImageWrap from "../../components/image";
import ImageBorder from "../../components/image-border";
import { ReactNode } from "react";
import { PORTFOLIO_PUBLIC, SOCIAL_PUBLIC } from "@/configs/route";

const Emphasize = ({ children }: { children: ReactNode }) => {
  return (
    <Typography color="common.white" variant="inherit" display={"inline"}>
      <strong>{children}</strong>
    </Typography>
  );
};

export default function Home() {
  return (
    <Box
      height={"100vh"}
      display={"flex"}
      flexDirection={"column"}
      alignItems={"center"}
      justifyContent={"center"}
      padding={2}
      sx={{
        background: `linear-gradient(90deg, rgba(5, 9, 18, 1) 0%, rgba(6, 6, 12, 0.2) 98%) 100% no-repeat, url(${PORTFOLIO_PUBLIC}/background.jpg) 0 0/cover no-repeat !important`,
      }}
    >
      <Stack
        direction={"column"}
        alignItems={"center"}
        justifyContent={"center"}
        gap={2}
      >
        <Stack direction={"row"} alignItems={"center"} boxSizing={"border-box"}>
          <ImageWrap size={215} rounded src={`${PORTFOLIO_PUBLIC}/self-pic`} />
          <Stack padding={4} spacing={4}>
            <Stack>
              <Typography variant={"h1"} color={"grey.400"}>
                Hello,
                <br /> I&apos;m <Emphasize>Viriyadhika</Emphasize>
              </Typography>
              <Typography variant={"h5"} color={"grey.400"}>
                I&apos;m a <Emphasize>Software Engineer</Emphasize> currently
                based in Singapore.
                <br />I enjoy building cool{" "}
                <Emphasize>Web Applications</Emphasize>.
              </Typography>
            </Stack>
            <Stack direction="row" spacing={2}>
              {["linkedin", "github", "gmail"].map((name) => (
                <ImageBorder key={name} size={50}>
                  <ImageWrap size={30} src={`${SOCIAL_PUBLIC}/${name}`} />
                </ImageBorder>
              ))}
            </Stack>
          </Stack>
        </Stack>
        <Button
          variant="outlined"
          color={"primary"}
          sx={{ typography: "h5", px: 3, py: 1 }}
        >
          See my experiences
        </Button>
      </Stack>
    </Box>
  );
}
