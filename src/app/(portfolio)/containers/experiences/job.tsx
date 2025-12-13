import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Chip,
  Collapse,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import ImageBorder from "../../components/image-border";
import ImageWrap from "../../components/image";
import { useState } from "react";
import { CheckCircle, DateRange, KeyboardArrowDown } from "@mui/icons-material";
import { JOB_PUBLIC } from "@/configs/route";
import SkillTag, { SkillTagProps } from "./skill-tag";

export type JobProps = {
  company: string;
  title: string;
  date: string;
  image: string;
  descriptions: string[];
  skills: SkillTagProps[];
};

export default function Job({
  company,
  title,
  descriptions,
  image,
  date,
  skills,
}: JobProps) {
  const [expand, setExpand] = useState(false);
  return (
    <Card
      sx={{
        maxWidth: "min(40%, 400px)",
        minWidth: 300,
        bgcolor: "grey.100"
      }}
    >
      <CardHeader
        avatar={
          <ImageBorder size={100}>
            <ImageWrap size={80} src={`${JOB_PUBLIC}/${image}`} rounded />
          </ImageBorder>
        }
        title={<Typography variant={"h5"}>{company}</Typography>}
        subheader={
          <Stack direction={"column"}>
            <Typography variant={"h6"}>{title}</Typography>
            <Stack direction="row" gap={1} alignItems={"center"}>
              <DateRange color="primary" fontSize={"small"} />
              <Typography variant={"body2"}>{date}</Typography>
            </Stack>
          </Stack>
        }
      />
      <CardContent>
        <Stack direction={"column"} gap={1}>
          <Box>
            <Stack direction={"row"} spacing={1} useFlexGap flexWrap={"wrap"}>
              {skills.map((skill) => (
                <SkillTag key={skill.name} {...skill} />
              ))}
            </Stack>
          </Box>
        </Stack>
      </CardContent>
      <CardActions >
        <Button
          endIcon={
            <KeyboardArrowDown
              sx={{
                transform: expand ? "rotate(-180deg)" : undefined,
                transition: "transform 0.1s",
              }}
            />
          }
          onClick={() => setExpand((e) => !e)}
        >
          {expand ? "Collapse" : "Expand"}
        </Button>
      </CardActions>

      <Collapse in={expand}>
        <CardContent>
          {descriptions.map((description, idx) => {
            return (
              <ListItemText key={idx}>
                <Stack direction={"row"} spacing={1}>
                  <CheckCircle fontSize="small" color="success" />
                  <Typography variant={"body2"}>{description}</Typography>
                </Stack>
              </ListItemText>
            );
          })}
        </CardContent>
      </Collapse>
    </Card>
  );
}
