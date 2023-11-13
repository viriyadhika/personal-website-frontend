import { Box, Stack, Tab, Tabs } from "@mui/material";
import { useState } from "react";
import ImageWrap from "../../components/image";
import ImageBorder from "../../components/image-border";
import { SKILLS_PUBLIC } from "@/configs/route";

export type Category = {
  name: string;
  label: string;
  images: string[];
};

const categories: Category[] = [
  {
    name: "language",
    label: "Programming language",
    images: ["javascript", "python", "java"],
  },
  {
    name: "frontend",
    label: "Front-end",
    images: ["android_studio", "react", "bootstrap"],
  },
  {
    name: "backend",
    label: "Back-end",
    images: ["django", "drf"],
  },
  {
    name: "devops",
    label: "Dev Ops",
    images: ["nginx", "docker"],
  },
];

function TabPanel({
  index,
  active,
  category,
}: {
  index: number;
  active: number;
  category: Category;
}) {
  return (
    <div
      role="tabpanel"
      hidden={active !== index}
      id={`skill-tabpanel-${index}`}
      aria-labelledby={`skill-tab-${index}`}
    >
      {active === index && (
        <Stack p={2} direction={"row"} spacing={2}>
          {category.images.map((image) => (
            <ImageBorder key={image} size={80}>
              <ImageWrap src={`${SKILLS_PUBLIC}/${image}`} size={55} />
            </ImageBorder>
          ))}
        </Stack>
      )}
    </div>
  );
}

export default function Content() {
  const [active, setActive] = useState(0);
  return (
    <Box>
      <Tabs
        value={active}
        onChange={(_e, idx) => {
          setActive(idx);
        }}
        variant="scrollable"
        allowScrollButtonsMobile
        scrollButtons={"auto"}
      >
        {categories.map((category) => (
          <Tab
            label={category.label}
            key={category.name}
            id={`skill-tab-${category.name}`}
            aria-controls={`skill-tab-${category.name}`}
          />
        ))}
      </Tabs>
      {categories.map((category, idx) => (
        <TabPanel
          key={category.name}
          category={category}
          index={idx}
          active={active}
        />
      ))}
    </Box>
  );
}
