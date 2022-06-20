import { useState, useContext } from "react";
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

import { LoginContext } from "../../state/LoginContext";
import { registerUser } from "../../api/index";
import Input from "../Input";
const Register = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loginedUser, setLoginedUser] = useContext(LoginContext);
  const [response, setResponse] = useState("");
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await registerUser(formData);
    setResponse(result.message);
    if (result?.auth?.user !== null && result?.auth?.user !== undefined) {
      localStorage.setItem("std-profile", JSON.stringify(result?.auth));
      setLoginedUser(result?.auth?.user);
    }
    if (
      !(result.message.includes("already") || result.message.includes("match"))
    )
      // console.log("enable clear func");
    clear();
  };
  const clear = () => {
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
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
          Register
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container maxWidth="xs" spacing={2}>
            <Input
              half
              name="firstName"
              label="First Name"
              type="text"
              value={formData.firstName}
              autoFocus
              handleChange={handleChange}
            />
            <Input
              half
              name="lastName"
              label="Last Name"
              type="text"
              value={formData.lastName}
              handleChange={handleChange}
            />
            <Input
              name="email"
              label="Email"
              type="email"
              value={formData.email}
              handleChange={handleChange}
            />
            <Input
              name="password"
              label="Password"
              value={formData.password}
              handleChange={handleChange}
              type={showPassword ? "text" : "password"}
              handleShowPassword={handleShowPassword}
            />
            <Input
              name="confirmPassword"
              label="Repeat Password"
              value={formData.confirmPassword}
              handleChange={handleChange}
              type={"password"}
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
            Register
          </Button>
        </form>
        <Button
          component={Link}
          to="/login"
          fullWidth
          sx={{
            mt: 2,
            color: "#2e3135",
            "&:hover": {
              backgroundColor: "#e0ecff",
            },
          }}
        >
          Already have an account?
          <span style={{ fontWeight: "bold" }}>&nbsp;Log In</span>
        </Button>
        <Typography
          varinat="p"
          color={
            response.includes("already")
              ? "red"
              : response.includes("match")
              ? "red"
              : "green"
          }
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

export default Register;
