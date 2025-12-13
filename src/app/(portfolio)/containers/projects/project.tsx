import { useState } from "react";

import {
    Box,
    Card,
    CardHeader,
    CardContent,
    CardActions,
    Stack,
    Typography,
    Button,
    Collapse,
    ListItemText,
    Link
} from "@mui/material";

import {
    DateRange,
    KeyboardArrowDown,
    CheckCircle,
} from "@mui/icons-material";

import SkillTag, { SkillTagProps } from "../../components/skill-tag";

export type ProjectProps = {
    title: string;
    date: string;
    descriptions: string[];
    skills: SkillTagProps[];
    links: { link: string, label: string }[];
};

export default function Job({
    title,
    date,
    descriptions,
    skills,
    links
}: ProjectProps) {
    const [expand, setExpand] = useState(false);
    return (
        <Card
            sx={{
                maxWidth: "min(40%, 400px)",
                minWidth: 300,
                bgcolor: "grey.100",
                border: "1px solid",
                borderColor: "grey.300",
            }}
        >
            <CardHeader
                title={<Stack>
                    <Typography variant={"h5"}>{title}</Typography>
                    <Stack direction={"row"} spacing={2}>
                        {links.map(({ link, label }) => <Link key={link} target="_blank" href={link}><Typography>{label}</Typography></Link>)
                        }
                    </Stack>
                </Stack>}
                subheader={
                    <Stack direction={"column"}>
                        <Stack direction="row" gap={1} alignItems={"center"}>
                            <DateRange color="primary" fontSize={"small"} />
                            <Typography variant={"body2"}>{date}</Typography>
                        </Stack>
                    </Stack>
                }
            />
            <CardContent>
                <Stack
                    direction="row"
                    spacing={1}
                    useFlexGap
                    flexWrap="wrap"
                >
                    {skills.map((skill) => (
                        <SkillTag key={skill.name} {...skill} />
                    ))}
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
