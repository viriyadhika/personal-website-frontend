import { DateRange, ExpandMore } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Link,
  Typography,
} from "@mui/material";
import { Stack } from "@mui/system";

export type AchievementInfo = {
  title: string;
  contents: Array<{
    title: string;
    date: string;
    description: string;
    link?: string;
  }>;
};

export default function Achievement({
  achievement,
}: {
  achievement: AchievementInfo;
}) {
  return (
    <Accordion key={achievement.title}>
      <AccordionSummary expandIcon={<ExpandMore />}>
        <Typography variant={"h5"}>{achievement.title}</Typography>
      </AccordionSummary>
      {achievement.contents.map((content, idx) => (
        <AccordionDetails key={idx}>
          <Typography variant="h6">{content.title}</Typography>
          <Stack direction="row" alignItems={"center"}>
            <DateRange color="primary" />
            <Typography variant="body2">{content.date}</Typography>
          </Stack>
          <Typography>{content.description}</Typography>
          {content.link && (
            <Link target="_blank" href={content.link}>
              <Typography>Link</Typography>
            </Link>
          )}
        </AccordionDetails>
      ))}
    </Accordion>
  );
}
