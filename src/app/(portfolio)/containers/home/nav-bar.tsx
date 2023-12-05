import { AppBar, Button, Stack, Toolbar } from "@mui/material";
import ImageWrap from "../../components/image";
import { PORTFOLIO_PUBLIC } from "@/configs/route";

export default function NavBar() {
  return (
    <AppBar position="sticky">
      <Toolbar sx={{ backgroundColor: "grey.50" }}>
        <ImageWrap size={50} src={`${PORTFOLIO_PUBLIC}/VPlogo-final`} />
        <Stack ml={"auto"} direction={"row"} spacing={2}>
          <Button>My experiences</Button>
          <Button>Skills</Button>
        </Stack>
      </Toolbar>
    </AppBar>
  );
}
