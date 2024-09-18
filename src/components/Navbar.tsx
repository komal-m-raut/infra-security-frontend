import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import useAuth from "../hooks/useAuth";

const Navbar = () => {
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    window.location.replace("/login");
  };

  return (
    <AppBar position="fixed">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Dashboard
        </Typography>
        <Button color="inherit" onClick={handleLogout}>
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
