import { Box, Card, Divider, Stack, Typography } from "@mui/material";
import ImageWrap from "../../components/image";
import { SKILLS_PUBLIC } from "@/configs/route";

export type SkillTagProps = { skillSrc: string; name: string };

export default function SkillTag({ skillSrc, name }: SkillTagProps) {
  return (
    <Card sx={{ width: 80 }}>
      <Stack
        direction={"column"}
        justifyContent={"center"}
        alignItems={"center"}
        pt={0.5}
        height={"100%"}
      >
        <Box
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          pb={0.5}
          sx={{
            backgroundColor: "white",
          }}
        >
          <ImageWrap size={40} src={`${SKILLS_PUBLIC}/${skillSrc}`} />
        </Box>
        <Divider sx={{ width: "100%" }} />
        <Box display={"flex"} alignItems={"center"} height={"100%"}>
          <Typography
            textAlign={"center"}
            color={"grey.700"}
            px={1}
            variant={"caption"}
          >
            {name}
          </Typography>
        </Box>
      </Stack>
    </Card>
  );
}
