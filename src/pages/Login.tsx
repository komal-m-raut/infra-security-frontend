import { useState } from "react";
import {
  TextField,
  Button,
  Container,
  Typography,
  IconButton,
  InputAdornment,
  Link,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import useAuth from "../hooks/useAuth";
// import api from "../services/api";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();

  const handleLogin = async () => {
    try {
      // const response = await api.post("/login", { email, password });
      // login(response.data.token, () => navigate("/dashboard"));
      login("Temporary token", () => window.location.replace("/dashboard"));
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  return (
    <Container>
      <Typography variant="h4">Login</Typography>
      <TextField
        label="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Password"
        type={showPassword ? "text" : "password"}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        fullWidth
        margin="normal"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={() => setShowPassword(!showPassword)}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={handleLogin}
      >
        Login
      </Button>
      <Typography variant="body1" sx={{ marginTop: "1rem" }}>
        Don't have an account? Click <Link href="/register">here</Link> to
        Register
      </Typography>
    </Container>
  );
};

export default Login;
