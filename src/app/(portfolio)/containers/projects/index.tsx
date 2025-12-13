import { Stack, Typography } from "@mui/material";
import Project, { ProjectProps } from "./project";
import { ForwardedRef, forwardRef } from "react";
import { PROJECT_PUBLIC } from "@/configs/route";

const jobs: ProjectProps[] = [
    {
        title: "Exploration Agent Based on Pure Visual Cue",
        date: "Dec 2025",
        descriptions: [
            `Developed a vision-only reinforcement learning agent for autonomous indoor exploration using CLIP-based intrinsic novelty rewards, enabling navigation-like behavior without depth, pose estimation, or explicit task objectives`,
            `Implemented a compact PPO-based architecture with a frozen ResNet-18 encoder and sliding-window Transformer, demonstrating that lightweight models (~3.2M parameters) can learn stable exploration strategies in visually rich 3D environments`,
            `Conducted extensive architectural and reward-function ablations (local vs sliding-window attention, random vs PCA projections, curiosity removal), revealing how intrinsic motivation and temporal modeling shape emergent exploration behaviors`
        ],
        skills: [
            {
                skillSrc: "pytorch",
                name: "PyTorch"
            },
            {
                skillSrc: "deeplearning",
                name: "Deep Learning"
            },
            {
                skillSrc: "python",
                name: "Python",
            },
        ],
        links: [
            { link: `${PROJECT_PUBLIC}/navassistant/final_report.pdf`, label: "Project Paper" },
            { link: "projects/navassistant", label: "Project Results" }, 
        ]
    }
];

function Projects(_: {}, ref: ForwardedRef<HTMLDivElement>) {
    return (
        <Stack p={2} spacing={2} ref={ref}>
            <Typography variant={"h4"}>Projects</Typography>
            <Stack
                direction={"row"}
                spacing={2}
                justifyContent={"center"}
                useFlexGap
                flexWrap={"wrap"}
            >
                {jobs.map((job) => (
                    <Project key={job.title} {...job} />
                ))}
            </Stack>
        </Stack>
    );
}

export default forwardRef(Projects);
