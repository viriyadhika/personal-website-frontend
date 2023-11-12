import { AppBar, Button, Stack, Toolbar } from "@mui/material";
import ImageWrap from "../../components/image";

export default function NavBar() {
  return (
    <AppBar position="sticky">
      <Toolbar sx={{ backgroundColor: "grey.50" }}>
        <ImageWrap size={50} name={"VPlogo-final"} />
        <Stack ml={"auto"} direction={"row"} spacing={2}>
          <Button color="info">My experiences</Button>
          <Button>Skills</Button>
        </Stack>
      </Toolbar>
    </AppBar>
  );
}
