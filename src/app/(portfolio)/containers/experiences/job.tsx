import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Collapse,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import ImageBorder from "../../components/image-border";
import ImageWrap from "../../components/image";
import { useState } from "react";
import {
  CheckCircleOutline,
  DateRange,
  KeyboardArrowDown,
} from "@mui/icons-material";

export type JobProps = {
  company: string;
  title: string;
  date: string;
  image: string;
  descriptions: string[];
};

export default function Job({
  company,
  title,
  descriptions,
  image,
  date,
}: JobProps) {
  const [expand, setExpand] = useState(false);
  return (
    <Card sx={{ maxWidth: "min(45%, 400px)", minWidth: 350 }}>
      <CardHeader
        avatar={
          <ImageBorder size={100}>
            <ImageWrap size={80} name={image} rounded />
          </ImageBorder>
        }
        title={<Typography variant={"h5"}>{company}</Typography>}
        subheader={
          <>
            <Typography variant={"h6"}>{title}</Typography>
            <Stack direction="row" gap={1} alignItems={"center"}>
              <DateRange />
              <Typography>{date}</Typography>
            </Stack>
          </>
        }
      />
      <CardContent>
        <Typography>Skills</Typography>
      </CardContent>
      <CardActions>
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
                  <CheckCircleOutline color="primary" />
                  <Typography>{description}</Typography>
                </Stack>
              </ListItemText>
            );
          })}
        </CardContent>
      </Collapse>
    </Card>
  );
}
