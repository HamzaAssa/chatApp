import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Link, Navigate } from "react-router-dom";
import {
  Container,
  Paper,
  Avatar,
  Typography,
  Grid,
  Button,
  TextField,
} from "@mui/material";
import GroupOulinedIcon from "@mui/icons-material/GroupOutlined";
import { LoginContext } from "../../state/LoginContext";
import { createGroup } from "../../api/index";
const CreateGroup = () => {
  const [logedUser, setLogedUser] = useContext(LoginContext);
  const [groupName, setGroupName] = useState("");
  const [response, setResponse] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setGroupName(groupName.trim());
    const token = JSON.parse(localStorage.getItem("std-profile"))?.token;
    const result = await createGroup(logedUser?._id, groupName, token);
    setResponse(result.message);
    if (result?.user) {
      setLogedUser(result?.user);
      localStorage.setItem(
        "std-profile",
        JSON.stringify({
          token: token,
          user: result?.user,
        })
      );
      navigate("/");
    }
  };
  const handleChange = (e) => {
    setGroupName(e.target.value);
  };
  return (
    <Container component="main" maxWidth="xs">
      <Paper
        elevation={3}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mt: 10,
          p: 2,
        }}
      >
        <Avatar
          sx={{
            my: 1,
            alignSelf: "center",
            backgroundColor: "blue",
          }}
        >
          <GroupOulinedIcon />
        </Avatar>
        <Typography
          variant="h5"
          sx={{
            mb: 3,
            fontWeight: "bold",
          }}
        >
          Create Group
        </Typography>

        <form onSubmit={handleSubmit}>
          <Grid container maxWidth="xs" spacing={2}>
            <Grid
              item
              xs={12}
              sx={{
                width: "200px",
              }}
            >
              <TextField
                name="groupName"
                onChange={handleChange}
                value={groupName}
                required
                fullWidth
                variant="outlined"
                label="Group Name"
                type="text"
                autoFocus
                autoComplete="false"
              />
            </Grid>

            <Grid item xs={12}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  mt: 2,
                }}
              >
                Create
              </Button>
            </Grid>
          </Grid>
        </form>
        <Typography
          varinat="p"
          color="green"
          textAlign="center"
          sx={{
            mt: 2,
            mb: -2,
          }}
        >
          {response}
        </Typography>
        <Button
          component={Link}
          to="/joingroup"
          sx={{
            mt: 2,
            color: "#2e3135",
            "&:hover": {
              backgroundColor: "#e0ecff",
            },
          }}
        >
          Join Group
        </Button>
      </Paper>
    </Container>
  );
};

export default CreateGroup;
