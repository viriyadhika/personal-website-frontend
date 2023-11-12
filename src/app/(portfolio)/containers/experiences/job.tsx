import { Box, List, ListItemText, Stack, Typography } from "@mui/material";
import ImageBorder from "../../components/image-border";
import ImageWrap from "../../components/image";

export type JobProps = {
  company: string;
  title: string;
  image: string;
  descriptions: string[];
};

export default function Job({ company, title, descriptions, image }: JobProps) {
  return (
    <Stack direction={"row"} gap={2}>
      <ImageBorder size={100}>
        <ImageWrap size={80} name={image} rounded />
      </ImageBorder>
      <Box>
        <Typography variant={"h5"}>{company}</Typography>
        <Typography variant={"h6"}>{title}</Typography>
        <Stack spacing={2}>
          {descriptions.map((description, idx) => {
            return (
              <ListItemText sx={{ listStyleType: "circle" }} key={idx}>
                <Typography variant={"body2"}>{description}</Typography>
              </ListItemText>
            );
          })}
        </Stack>
      </Box>
    </Stack>
  );
}
