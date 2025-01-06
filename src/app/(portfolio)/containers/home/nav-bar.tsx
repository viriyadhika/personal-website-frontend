import {
  AppBar,
  Button,
  Drawer,
  IconButton,
  Stack,
  Toolbar,
} from "@mui/material";
import ImageWrap from "../../components/image";
import { PORTFOLIO_PUBLIC } from "@/configs/route";
import MenuIcon from "@mui/icons-material/Menu";
import { Section } from "../../constants";
import { useState } from "react";

const buttons = [
  {
    section: Section.experiences,
    title: "My experiences",
  },
  {
    section: Section.education,
    title: "Education and achievement",
  },
  {
    section: Section.skills,
    title: "SKills",
  },
];

export default function NavBar({
  onClick,
}: {
  onClick: (section: Section) => void;
}) {
  const [mobileOpen, setMobileOpen] = useState(false);
  function handleDrawerToggle() {
    setMobileOpen((o) => !o);
  }
  return (
    <AppBar position="sticky">
      <Toolbar sx={{ backgroundColor: "grey.50" }}>
        <ImageWrap size={50} src={`${PORTFOLIO_PUBLIC}/VPlogo-final`} />
        <Stack ml={"auto"} direction={"row"} spacing={2}>
          {buttons.map((button) => {
            return (
              <Button
                variant={"text"}
                sx={{ display: { sm: "block", xs: "none" } }}
                key={button.section}
                onClick={() => {
                  onClick(button.section);
                }}
              >
                {button.title}
              </Button>
            );
          })}
          <IconButton
            color="primary"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
        </Stack>

        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
          }}
        >
          {buttons.map((button) => {
            return (
              <Button
                key={button.section}
                onClick={() => {
                  onClick(button.section);
                  handleDrawerToggle();
                }}
              >
                {button.title}
              </Button>
            );
          })}
        </Drawer>
      </Toolbar>
    </AppBar>
  );
}
