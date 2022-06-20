import { useState, useContext } from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Box,
  IconButton,
  Button,
} from "@mui/material";
import AttachmentOutlinedIcon from "@mui/icons-material/AttachmentOutlined";

import { LoginContext } from "../../state/LoginContext";
import { GroupContext } from "../../state/GroupContext";
import { CurrentGroupContext } from "../../state/CurrentGroupContext";

import { changeAvatar, findGroups } from "../../api/index";

import checkLogedUser from "../../utils/checkLogedUser";

const UserProfile = () => {
  const [logedUser, setLogedUser] = useContext(LoginContext);
  const [groups, setGroups] = useContext(GroupContext);
  const [currentGroup, setCurrentGroup] = useContext(CurrentGroupContext);
  const [avatar, setAvatar] = useState("");

  const handleChangeAvatar = async () => {
    if (avatar !== "") {
      const token = JSON.parse(localStorage.getItem("std-profile"))?.token;
      let formData = new FormData();
      formData.append("avatar", avatar);
      formData.append("id", logedUser?._id);
      setAvatar("");
      const result = await changeAvatar(token, formData);
      setLogedUser(result);
      localStorage.setItem(
        "std-profile",
        JSON.stringify({ token: token, user: result })
      );
      const res = await findGroups(result?.groups, token);
      if (res?.length > 0) {
        await setCurrentGroup(res[0]);
        localStorage.setItem(
          "current-group",
          JSON.stringify({ name: res[0].name })
        );
        await setGroups(res);
      }
    }
  };

  return (
    <Box>
      <Card
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        {logedUser?.avatarSrc === undefined ? null : logedUser?.avatarSrc !==
          "/static/images/avatar/2.jpg" ? (
          <CardMedia
            component="img"
            height="170"
            src={`${process.env.REACT_APP_BASE_URL}${logedUser?.avatarSrc}`}
            alt="User Icon"
            sx={{
              alignSelf: "center",
              borderRadius: 10,
              mt: 1,
              mb: 0.5,
              width: 250,
              objectFit: "contain",
            }}
          />
        ) : null}
        <CardContent>
          <Typography
            variant="h5"
            sx={{
              alignSelft: "center",
              display: "inline",
              borderRadius: 5,
              mt: -2,
              ml: 0.5,
              px: 0.7,
            }}
          >
            {`${logedUser?.firstName} ${logedUser?.lastName}`}
          </Typography>
        </CardContent>
        <Box>
          <CardActions
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <label
              style={{
                cursor: "pointer",
                padding: "12px 15px",
                position: "fixed",
                width: "3px",
                height: "3px",
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
                  setAvatar(e.target.files[0]);
                }}
              ></input>
            </label>
            <IconButton disabled={!checkLogedUser()}>
              <AttachmentOutlinedIcon
                sx={{
                  cursor: "pointer",
                }}
              />
            </IconButton>
            <Button
              disabled={!checkLogedUser()}
              onClick={handleChangeAvatar}
              sx={{
                color: "white",
                backgroundColor: "gray",
                "&:hover": {
                  backgroundColor: "#171515",
                },
              }}
            >
              Save
            </Button>
          </CardActions>
        </Box>
      </Card>
    </Box>
  );
};

export default UserProfile;
