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
import api from "../services/api";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleRegister = async () => {
    try {
      await api.post("/auth/signup", { email, password });
      window.location.replace("/login");
    } catch (error) {
      console.error("Registration failed", error);
    }
  };

  return (
    <Container>
      <Typography variant="h4">Register</Typography>
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
        onClick={handleRegister}
      >
        Register
      </Button>
      <Typography variant="body1" sx={{ marginTop: "1rem" }}>
        Already have an account? Click <Link href="/login">here</Link> to Login
      </Typography>
    </Container>
  );
};

export default Register;
