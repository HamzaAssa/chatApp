import { useContext } from "react";

import { Box, Typography } from "@mui/material";
import Drawer from "@mui/material/Drawer";
import OwnDrawer from "./Drawer";
import { MobileSideBarContext } from "../../state/MobileSideBarContext";
import { LoginContext } from "../../state/LoginContext";

const drawerWidth = 240;

function SideBar(props) {
  const { window } = props;

  const [logedUser, setLogeduser] = useContext(LoginContext);
  const [mobileOpen, setMobileOpen] = useContext(MobileSideBarContext);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth + 20,
            },
          }}
        >
          <OwnDrawer />
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth + 70,
              height: "83vh",
              mt: 8,
              mb: 15,
            },
          }}
          open
        >
          <OwnDrawer />
        </Drawer>
      </Box>
    </>
  );
}

export default SideBar;
