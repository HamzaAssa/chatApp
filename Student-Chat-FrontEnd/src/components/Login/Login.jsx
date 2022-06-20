import { useState, useContext } from "react";
import { LoginContext } from "../../state/LoginContext";
import {
  Paper,
  Grid,
  Container,
  Typography,
  Button,
  Avatar,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Link, useNavigate } from "react-router-dom";

import Input from "../Input";
import { loginUser } from "../../api/index";
const Login = () => {
  const [loginedUser, setLoginedUser] = useContext(LoginContext);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [response, setResponse] = useState("");
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const navigate = useNavigate();
  const handleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await loginUser(formData);
    // console.log(result?.auth?.user);
    setResponse(result.message);

    if (result?.auth?.user !== null && result?.auth?.user !== undefined) {
      localStorage.setItem("std-profile", JSON.stringify(result?.auth));
      setLoginedUser(result?.auth?.user);
      // console.log(localStorage.getItem("std-profile"));
    }

    if (
      !(result.message.includes("Invalid") || result.message.includes("wrong"))
    )
      clear();
  };
  const clear = () => {
    setFormData({
      email: "",
      password: "",
    });
    setShowPassword(false);
    navigate("/");
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
            backgroundColor: "red",
          }}
        >
          <LockOutlinedIcon />
        </Avatar>
        <Typography
          variant="h5"
          sx={{
            mb: 3,
            fontWeight: "bold",
          }}
        >
          Log In
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container maxWidth="xs" spacing={2}>
            <Input
              name="email"
              label="Email"
              type="email"
              value={formData.email}
              autoFocus
              handleChange={handleChange}
            />
            <Input
              name="password"
              label="Password"
              type={showPassword ? "text" : "password"}
              value={formData.password}
              handleChange={handleChange}
              handleShowPassword={handleShowPassword}
            />
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 2,
            }}
          >
            Log In
          </Button>
        </form>
        <Button
          component={Link}
          to="/register"
          fullWidth
          sx={{
            mt: 2,
            color: "#2e3135",
            "&:hover": {
              backgroundColor: "#e0ecff",
            },
          }}
        >
          Don't have an account?
          <span style={{ fontWeight: "bold" }}>&nbsp;Register</span>
        </Button>
        <Typography
          varinat="p"
          color={response.includes("Invalid" || "wrong") ? "red" : "green"}
          sx={{
            fontFamily: "sans-serif",
          }}
        >
          {response}
        </Typography>
      </Paper>
    </Container>
  );
};

export default Login;
