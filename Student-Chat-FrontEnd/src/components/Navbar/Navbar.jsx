import { useContext, useEffect } from "react";
import {
  Menu,
  AppBar,
  Toolbar,
  Typography,
  Button,
  Avatar,
  IconButton,
  Tooltip,
  Box,
  MenuItem,
  Container,
} from "@mui/material";
import { Link } from "react-router-dom";
import { LoginContext } from "../../state/LoginContext";
import { MobileSideBarContext } from "../../state/MobileSideBarContext";
import { CurrentGroupContext } from "../../state/CurrentGroupContext";
const Navbar = () => {
  // console.log(MobileSideBarContext);
  // console.log(CurrentGroupContext);
  const [mobileSideBarOpen, setMobileSideBarOpen] =
    useContext(MobileSideBarContext);
  // const [currentGroup, setCurrentGroup] = useContext(CurrentGroupContext);

  const [logedUser, setLogedUser] = useContext(LoginContext);
  const logOut = () => {
    localStorage.removeItem("std-profile");
    setLogedUser(null);
    localStorage.removeItem("current-group");
    // setCurrentGroup({});
  };
  useEffect(() => {
    setLogedUser(JSON.parse(localStorage.getItem("std-profile"))?.user);
  }, []);
  const handleSideBarToggle = () => {
    setMobileSideBarOpen(!mobileSideBarOpen);
  };
  return (
    <Container id="appBarCon">
      <Box sx={{ flexGrow: 1 }}>
        <AppBar
          id="appBar"
          postion="static"
          sx={{
            backgroundColor: "black",
          }}
        >
          <Toolbar
            id="appBarIn"
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleSideBarToggle} sx={{ p: 0 }}>
                  <Avatar
                    alt={logedUser?.firstName}
                    src={process.env.REACT_APP_BASE_URL + logedUser?.avatarSrc}
                  />
                </IconButton>
              </Tooltip>
            </Box>
            <Box>
              <Typography
                component={Link}
                to="/"
                fontWeight="bold"
                sx={{
                  color: "white",
                  textDecoration: "none",
                }}
                variant="h5"
              >
                Student <span style={{ color: "#78b4ad" }}>chat</span>
              </Typography>
            </Box>
            {logedUser === null || logedUser === undefined ? (
              <Box justifySelf="end">
                <Button
                  component={Link}
                  to="/login"
                  variant="contained"
                  sx={{
                    backgroundColor: "#4f706c",
                    "&:hover": {
                      backgroundColor: "#3c5552",
                    },
                  }}
                >
                  log in
                </Button>
              </Box>
            ) : (
              <Box justifySelf="end">
                <Button
                  onClick={logOut}
                  variant="contained"
                  sx={{
                    backgroundColor: "red",
                    "&:hover": {
                      backgroundColor: "red",
                    },
                  }}
                >
                  log out
                </Button>
              </Box>
            )}
          </Toolbar>
        </AppBar>
      </Box>
    </Container>
  );
};

export default Navbar;
