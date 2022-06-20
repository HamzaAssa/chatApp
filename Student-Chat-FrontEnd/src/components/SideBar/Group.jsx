import { useContext, useState } from "react";

import { ExpandMore, ExpandLess, Delete } from "@mui/icons-material";

import {
  ListItem,
  ListItemIcon,
  ListItemAvatar,
  Avatar,
  ListItemText,
  IconButton,
  Divider,
} from "@mui/material";

import { LoginContext } from "../../state/LoginContext";
import { GroupContext } from "../../state/GroupContext";
import { CurrentGroupContext } from "../../state/CurrentGroupContext";

import { deleteGroup, changeGroupIcon } from "../../api/index";

import checkLogedUser from "../../utils/checkLogedUser";

import GroupUsers from "./GroupUsers";

const Group = ({ group }) => {
  const [logedUser, setLogedUser] = useContext(LoginContext);
  const [Groups, setGroups] = useContext(GroupContext);
  const [currentGroup, setCurrentGroup] = useContext(CurrentGroupContext);
  const [open, setOpen] = useState(false);

  const auth = JSON.parse(localStorage.getItem("std-profile"));

  const chooseGroup = (groupId) => {
    const curGroup = Groups.filter((group) => group._id === groupId);
    setCurrentGroup(curGroup[0]);
    localStorage.setItem(
      "current-group",
      JSON.stringify({
        name: curGroup[0].name,
      })
    );
  };

  const handleDelete = async (group) => {
    const result = await deleteGroup(
      logedUser?._id,
      group?._id,
      group?.name,
      auth?.token
    );
    // if (result?.user?._id === logedUser?._id) {
    if (result.groups.length > 0) {
      localStorage.setItem(
        "current-group",
        JSON.stringify({
          name: result?.groups[0]?.name,
        })
      );
      setCurrentGroup(result?.groups[0]);
    } else {
      localStorage.setItem("current-group", JSON.stringify({ name: null }));
      setCurrentGroup({});
    }
    setLogedUser(result?.user);
    setGroups(result?.groups);
    localStorage.setItem(
      "std-profile",
      JSON.stringify({
        token: auth?.token,
        user: result?.user,
      })
    );
  };

  const changeGroupImg = async (id, icon) => {
    const token = JSON.parse(localStorage.getItem("std-profile"))?.token;

    if (icon !== undefined) {
      let formData = new FormData();
      formData.append("icon", icon);
      formData.append("id", id);
      const result = await changeGroupIcon(token, formData);

      let index = Groups.findIndex((group) => group._id === id);
      let tempGroups = Groups.filter((group) => group._id !== id);
      tempGroups.splice(index, 0, result);
      setGroups(tempGroups);
    }
  };

  return (
    <>
      <ListItem
        disabled={!checkLogedUser()}
        id={group._id}
        button
        onClick={() => chooseGroup(group._id)}
      >
        <ListItemIcon>
          <ListItemAvatar sx={{ p: 0 }}>
            <Avatar
              alt={group.name}
              src={`${process.env.REACT_APP_BASE_URL}${group?.iconSrc}`}
              sx={{
                pointerEvents: "none",
              }}
            />
            <label
              style={{
                cursor: "pointer",
                padding: "10px 18px",
                borderRadius: "50%",
                position: "relative",
                left: 0,
                top: -31,
                width: "15px",
                height: "5px",
                zIndex: 1000,
              }}
            >
              <input
                style={{
                  display: "none",
                }}
                name="avatar"
                type="file"
                disabled={!checkLogedUser()}
                accept="image/png, image/jpeg"
                onChange={(e) => {
                  changeGroupImg(group._id, e.target.files[0]);
                }}
              ></input>
            </label>
          </ListItemAvatar>
        </ListItemIcon>
        <ListItemText
          secondary={`Members ${group.members.length}`}
          primary={group.name}
          sx={{
            pointerEvents: "none",
          }}
        />
        <ListItemIcon>
          <IconButton onClick={() => handleDelete(group)}>
            <Delete
              sx={{
                pointerEvents: "none",
              }}
            />
          </IconButton>
          <IconButton onClick={() => setOpen(!open)}>
            {open ? (
              <ExpandLess
                sx={{
                  pointerEvents: "none",
                }}
              />
            ) : (
              <ExpandMore
                sx={{
                  pointerEvents: "none",
                }}
              />
            )}
          </IconButton>
        </ListItemIcon>
      </ListItem>
      <Divider variant="inset" component="li" />
      <GroupUsers members={group?.members} open={open} setOpen={setOpen} />
    </>
  );
};

export default Group;
