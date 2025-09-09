import { Box, Button, Snackbar, Stack, Typography } from "@mui/material";
import ImageWrap from "../../components/image";
import ImageBorder from "../../components/image-border";
import { ReactNode, useState } from "react";
import { PORTFOLIO_PUBLIC, SOCIAL_PUBLIC } from "@/configs/route";
import copy from "clipboard-copy";

const Emphasize = ({ children }: { children: ReactNode }) => {
  return (
    <Typography color="common.white" variant="inherit" display={"inline"}>
      <strong>{children}</strong>
    </Typography>
  );
};

const CopyToClipboardButton = ({
  textToCopy,
  children,
}: {
  textToCopy: string;
  children: ReactNode;
}) => {
  const [toastMessage, setToastMessage] = useState("");

  const handleCopyClick = async () => {
    try {
      await copy(textToCopy);
      setToastMessage(`${textToCopy} copied to the clipboard`);
    } catch (e) {
      setToastMessage("Something went wrong");
    }
  };

  return (
    <>
      <Snackbar
        open={Boolean(toastMessage)}
        autoHideDuration={2000}
        onClose={() => setToastMessage("")}
        message={toastMessage}
      />
      <div
        style={{
          padding: 0,
          backgroundColor: "transparent",
          cursor: "pointer",
        }}
        onClick={handleCopyClick}
      >
        {children}
      </div>
    </>
  );
};

const socials = [
  {
    name: "linkedin",
    Component: ({ children }: { children: ReactNode }) => (
      <a target="_blank" href={"https://linkedin.com/in/viriyadhika-putra"}>
        {children}
      </a>
    ),
  },
  {
    name: "github",
    Component: ({ children }: { children: ReactNode }) => (
      <a target="_blank" href={"https://github.com/viriyadhika"}>
        {children}
      </a>
    ),
  },
  {
    name: "gmail",
    Component: ({ children }: { children: ReactNode }) => (
      <CopyToClipboardButton textToCopy="viriya.dhika0@gmail.com">
        {children}
      </CopyToClipboardButton>
    ),
  },
];

export default function Home() {
  return (
    <Box
      height={"100vh"}
      display={"flex"}
      flexDirection={"column"}
      alignItems={"center"}
      justifyContent={"center"}
      padding={2}
      boxSizing={"border-box"}
      sx={{
        background: `linear-gradient(90deg, rgba(5, 9, 18, 1) 0%, rgba(6, 6, 12, 0.2) 98%) 100% no-repeat, url(${PORTFOLIO_PUBLIC}/background.jpg) 0 0/cover no-repeat !important`,
      }}
    >
      <Stack
        direction={"row"}
        alignItems={"center"}
        boxSizing={"border-box"}
        useFlexGap
        flexWrap={"wrap"}
        gap={4}
      >
        <ImageWrap size={215} rounded src={`${PORTFOLIO_PUBLIC}/self-pic`} />
        <Stack spacing={4}>
          <Stack>
            <Typography variant={"h1"} color={"grey.400"}>
              Hello,
              <br /> I&apos;m <Emphasize>Viriyadhika</Emphasize>
            </Typography>
            <Typography variant={"subheading"} color={"grey.400"}>
              I&apos;m a <Emphasize>Master Student in AI</Emphasize> currently
              in <Emphasize>Toronto</Emphasize>.
            </Typography>
          </Stack>
          <Stack direction="row" spacing={2}>
            {socials.map(({ name, Component }) => (
              <Component key={name}>
                <ImageBorder size={50}>
                  <ImageWrap size={30} src={`${SOCIAL_PUBLIC}/${name}`} />
                </ImageBorder>
              </Component>
            ))}
          </Stack>
          <a href={`${PORTFOLIO_PUBLIC}/Resume.pdf`} target="_blank">
            <Button variant={"contained"} color={"primary"} size={"large"}>
              Resume
            </Button>
          </a>
        </Stack>
      </Stack>
    </Box>
  );
}
