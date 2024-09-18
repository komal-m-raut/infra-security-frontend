import { Container, Button, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <Typography variant="h4">Welcome</Typography>
      <Box
        sx={{
          marginTop: "1rem",
          display: "flex",
          flexDirection: "column",
          rowGap: "1rem",
          minWidth: "14rem",
        }}
      >
        <Button
          fullWidth
          variant="contained"
          color="primary"
          onClick={() => navigate("/login")}
        >
          Login
        </Button>
        <Button
          fullWidth
          variant="contained"
          color="secondary"
          onClick={() => navigate("/register")}
        >
          Register
        </Button>
      </Box>
    </Container>
  );
};

export default Home;
