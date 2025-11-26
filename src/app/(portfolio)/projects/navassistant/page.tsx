import { Stack, Typography, Card, CardContent, Grid, Box } from "@mui/material";
import { forwardRef, ForwardedRef } from "react";

interface RLVideoItem {
  title: string;
  src: string;  // video path
  img: string;  // trajectory image path
}

interface RLSection {
  subheader: string;
  videos: RLVideoItem[];
}

// ---- Example Data (13 experiments) ----
const randomPath = "/portfolio/projects/navassistant/random"
const slidingWindowRandomResNetPath = "/portfolio/projects/navassistant/slliding_window_random_resnet"
const noCuriosityPath = "/portfolio/projects/navassistant/no_curiosity"
const pcaPath = "/portfolio/projects/navassistant/pca"
const newEnvPath = "/portfolio/projects/navassistant/new_env"
const sections: RLSection[] = [
    {
    subheader: "Random Path",
    videos: [
      { title: "Center Point", src: `${randomPath}/rolloutcenter_point.mp4`, img: `${randomPath}/rolloutcenter_point.png` },
      { title: "Inside Room", src: `${randomPath}/rolloutinside_room.mp4`, img: `${randomPath}/rolloutinside_room.png` },
      { title: "Trapped on the corner", src: `${randomPath}/rollouttrapped.mp4`, img: `${randomPath}/rollouttrapped.png` },
    ],
  },
  {
    subheader: "Sliding Window Transformer with Frozen ResNet Encoder and Random Encoder Embedding",
    videos: [
      { title: "Center Point", src: `${slidingWindowRandomResNetPath}/rolloutcenter_point.mp4`, img: `${slidingWindowRandomResNetPath}/rolloutcenter_point.png` },
      { title: "Inside Room", src: `${slidingWindowRandomResNetPath}/rolloutinside_room.mp4`, img: `${slidingWindowRandomResNetPath}/rolloutinside_room.png` },
      { title: "Trapped on the corner", src: `${slidingWindowRandomResNetPath}/rollouttrapped.mp4`, img: `${slidingWindowRandomResNetPath}/rollouttrapped.png` },
    ],
  },
  {
    subheader: "Sliding Window Transformer with Frozen ResNet with no Curiosity",
    videos: [
      { title: "Center Point", src: `${noCuriosityPath}/rolloutcenter_point.mp4`, img: `${noCuriosityPath}/rolloutcenter_point.png` },
      { title: "Inside Room", src: `${noCuriosityPath}/rolloutinside_room.mp4`, img: `${noCuriosityPath}/rolloutinside_room.png` },
      { title: "Trapped on the corner", src: `${noCuriosityPath}/rollouttrapped.mp4`, img: `${noCuriosityPath}/rollouttrapped.png` },
    ],
  },
  {
    subheader: "Sliding Window Transformer with Frozen ResNet Encoder and PCA Head",
    videos: [
      { title: "Center Point", src: `${pcaPath}/rolloutcenter_point.mp4`, img: `${pcaPath}/rolloutcenter_point.png` },
      { title: "Inside Room", src: `${pcaPath}/rolloutinside_room.mp4`, img: `${pcaPath}/rolloutinside_room.png` },
      { title: "Trapped on the corner", src: `${pcaPath}/rollouttrapped.mp4`, img: `${pcaPath}/rollouttrapped.png` },
    ],
  },
  {
    subheader: "New Environment - Sliding Window Transformer with Frozen ResNet Encoder and PCA Head",
    videos: [
    { title: "Center Point", src: `${newEnvPath}/rolloutcenter_point.mp4`, img: `${newEnvPath}/rolloutcenter_point.png` },
      { title: "Inside Bedroom", src: `${newEnvPath}/rolloutinside_bedroom.mp4`, img: `${newEnvPath}/rolloutinside_bedroom.png` },
      { title: "Inside Toilet", src: `${newEnvPath}/rolloutinside_toilet.mp4`, img: `${newEnvPath}/rolloutinside_toilet.png` },
    ],
  },
];

function RLVideos() {
  return (
    <Stack p={2} spacing={4}>
      <Typography variant="h4">Reinforcement Learning Results</Typography>

      {sections.map((section, idx) => (
        <Stack key={idx} spacing={2}>
          <Typography variant="h6" color="text.secondary">
            {section.subheader}
          </Typography>

          <Grid container spacing={2}>
            {section.videos.map((v) => (
              <Grid key={v.title} item xs={12} sm={6} md={4}>
                <Card>
                  <CardContent sx={{ p: 1.5 }}>
                    <Typography variant="subtitle2" gutterBottom noWrap>
                      {v.title}
                    </Typography>

                    <Box
                      sx={{
                        display: "flex",
                        gap: 1,
                        alignItems: "center",
                      }}
                    >
                      {/* Video */}
                      <video
                        src={v.src}
                        controls
                        style={{
                          width: "50%",
                          maxHeight: 240,
                          objectFit: "cover",
                          borderRadius: 6,
                        }}
                      />

                      {/* Trajectory Image */}
                      <img
                        src={v.img}
                        alt={v.title + " trajectory"}
                        style={{
                          width: "50%",
                          maxHeight: 240,
                          objectFit: "contain",
                          borderRadius: 6,
                        }}
                      />
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Stack>
      ))}
    </Stack>
  );
}

export default RLVideos;
