import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";

import { Divider, Typography, Grid, Button, List } from "@mui/material";

import UserProfile from "./UserProfile";
import checkLogedUser from "../../utils/checkLogedUser";
import Group from "./Group";

import { findGroups } from "../../api/index";

import { LoginContext } from "../../state/LoginContext";
import { GroupContext } from "../../state/GroupContext";
import { CurrentGroupContext } from "../../state/CurrentGroupContext";

const Drawer = () => {
  const [logedUser, setLogedUser] = useContext(LoginContext);
  const [groups, setGroups] = useContext(GroupContext);
  const [currentGroup, setCurrentGroup] = useContext(CurrentGroupContext);

  const auth = JSON.parse(localStorage.getItem("std-profile"));

  useEffect(async () => {
    if (checkLogedUser()) {
      const result = await findGroups(auth.user.groups, auth.token);
      if (result?.length > 0) {
        await setCurrentGroup(result[0]);
        localStorage.setItem(
          "current-group",
          JSON.stringify({ name: result[0].name })
        );
        await setGroups(result);
      }
    } else {
      setLogedUser(null);
      localStorage.removeItem("std-profile");
    }
  }, []);

  return (
    <div>
      <UserProfile />

      <Divider
        sx={{
          mb: 1,
        }}
      />
      <Typography
        variant="body1"
        color="white"
        sx={{
          ml: 0.2,
          pl: 1,
          fontSize: 17,
          backgroundColor: "#4f706c",
          borderRadius: 5,
        }}
      >
        Message will be deleted after a week.
      </Typography>
      <Divider
        sx={{
          mt: 1,
        }}
      />
      <Grid my={2} container justifyContent="space-around">
        <Grid item>
          <Button
            variant="contained"
            size="small"
            component={Link}
            to="/joingroup"
            disabled={!checkLogedUser()}
          >
            Join Group
          </Button>
        </Grid>
        <Grid item>
          <Button
            component={Link}
            to="/creategroup"
            variant="contained"
            size="small"
            disabled={!checkLogedUser()}
            sx={{
              backgroundColor: "#4f706c",
              "&:hover": {
                backgroundColor: "#3c5552",
              },
            }}
          >
            Create Group
          </Button>
        </Grid>
      </Grid>
      <Divider />
      <Typography variant="h5" fontWeight="bold" color="primary" ml={7} mt={1}>
        {logedUser?.groups.length} Groups
      </Typography>
      <List>
        {groups.map((group, index) => (
          <Group key={group._id} group={group} />
        ))}
      </List>
    </div>
  );
};

export default Drawer;
