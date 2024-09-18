import { Container, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <Typography variant="h4">Welcome</Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate("/login")}
      >
        Login
      </Button>
      <Button
        variant="contained"
        color="secondary"
        onClick={() => navigate("/register")}
      >
        Register
      </Button>
    </Container>
  );
};

export default Home;
