import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
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
import { joinGroup } from "../../api/index";
const Join = () => {
  const navigate = useNavigate();
  const [logedUser, setLogedUser] = useContext(LoginContext);
  const [groupName, setGroupName] = useState("");
  const [response, setResponse] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = JSON.parse(localStorage.getItem("std-profile"))?.token;
    const result = await joinGroup(logedUser?._id, groupName, token);

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
          Join Group
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
                Join
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
          }}
        >
          {response}
        </Typography>
        <Button
          component={Link}
          to="/createGroup"
          sx={{
            mt: 2,
            color: "#2e3135",
            "&:hover": {
              backgroundColor: "#e0ecff",
            },
          }}
        >
          Create Group
        </Button>
      </Paper>
    </Container>
  );
};

export default Join;
