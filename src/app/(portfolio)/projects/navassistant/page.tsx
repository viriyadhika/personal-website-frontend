import {
  Stack,
  Typography,
  Card,
  CardContent,
  Grid,
  Box,
  Divider,
} from "@mui/material";

interface RLVideoItem {
  title: string;
  src: string;
  img: string;
}

interface RLSection {
  subheader: string;
  videos: RLVideoItem[];
}

/* ---------- Data ---------- */

const BASE = "/portfolio/projects/navassistant";

const paths = {
  random: `${BASE}/random`,
  slidingRandom: `${BASE}/slliding_window_random_resnet`,
  noCuriosity: `${BASE}/sliding_window_no_curiosity`,
  pca: `${BASE}/sliding_window_pca`,
  newEnv: `${BASE}/new_env`,
  localAttn: `${BASE}/local_attn_random_resnet`,
};

const makeVideos = (path: string, insideLabel = "Inside Room") => [
  {
    title: "Center Point",
    src: `${path}/rolloutcenter_point.mp4`,
    img: `${path}/rolloutcenter_point.png`,
  },
  {
    title: insideLabel,
    src: `${path}/rolloutinside_room.mp4`,
    img: `${path}/rolloutinside_room.png`,
  },
  {
    title: "Trapped Corner",
    src: `${path}/rollouttrapped.mp4`,
    img: `${path}/rollouttrapped.png`,
  },
];

const sections: RLSection[] = [
  {
    subheader: "Random Policy Baseline",
    videos: makeVideos(paths.random),
  },
  {
    subheader: "Local Attention ResNet-18",
    videos: makeVideos(paths.localAttn),
  },
  {
    subheader: "Sliding Window Transformer (Random Embedding)",
    videos: makeVideos(paths.slidingRandom),
  },
  {
    subheader: "Sliding Window Transformer (No Curiosity)",
    videos: makeVideos(paths.noCuriosity),
  },
  {
    subheader: "Sliding Window Transformer (PCA Head)",
    videos: makeVideos(paths.pca),
  },
  {
    subheader: "New Environment (PCA Head)",
    videos: [
      {
        title: "Center Point",
        src: `${paths.newEnv}/rolloutcenter_point.mp4`,
        img: `${paths.newEnv}/rolloutcenter_point.png`,
      },
      {
        title: "Bedroom",
        src: `${paths.newEnv}/rolloutinside_bedroom.mp4`,
        img: `${paths.newEnv}/rolloutinside_bedroom.png`,
      },
      {
        title: "Toilet",
        src: `${paths.newEnv}/rolloutinside_toilet.mp4`,
        img: `${paths.newEnv}/rolloutinside_toilet.png`,
      },
    ],
  },
];

/* ---------- Components ---------- */

function VideoTile({ title, src, img }: RLVideoItem) {
  return (
    <Card
      elevation={2}
      sx={{
        height: "100%",
        transition: "0.2s",
        "&:hover": { transform: "translateY(-2px)", boxShadow: 4 },
      }}
    >
      <CardContent sx={{ p: 2 }}>
        <Typography
          variant="subtitle2"
          fontWeight={600}
          mb={1}
          textAlign="center"
        >
          {title}
        </Typography>

        <Box display="flex" gap={1}>
          <MediaBox>
            <video src={src} controls />
          </MediaBox>

          <MediaBox>
            <img src={img} alt={`${title} trajectory`} />
          </MediaBox>
        </Box>
      </CardContent>
    </Card>
  );
}

function MediaBox({ children }: { children: React.ReactNode }) {
  return (
    <Box
      sx={{
        flex: 1,
        bgcolor: "grey.100",
        borderRadius: 1,
        overflow: "hidden",
        "& video, & img": {
          width: "100%",
          height: 220,
          objectFit: "cover",
        },
      }}
    >
      {children}
    </Box>
  );
}

/* ---------- Main ---------- */

export default function RLVideos() {
  return (
    <Stack spacing={5} p={3}>
      <Box>
        <Typography variant="h4" fontWeight={700}>
          Reinforcement Learning Results
        </Typography>
        <Typography color="text.secondary">
          Qualitative rollout comparisons across models and environments
        </Typography>
      </Box>

      {sections.map((section) => (
        <Card
          key={section.subheader}
          elevation={0}
          sx={{
            bgcolor: "grey.50",
            border: "1px solid",
            borderColor: "grey.200",
          }}
        >
          <CardContent sx={{ p: 3 }}>
            <Typography variant="h6" fontWeight={600} mb={1}>
              {section.subheader}
            </Typography>

            <Divider sx={{ mb: 3 }} />

            <Grid container spacing={3}>
              {section.videos.map((video) => (
                <Grid key={video.title}>
                  <VideoTile {...video} />
                </Grid>
              ))}
            </Grid>
          </CardContent>
        </Card>
      ))}
    </Stack>
  );
}
