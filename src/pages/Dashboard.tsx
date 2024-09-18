import { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Modal,
  Box,
  TextField,
  IconButton,
  Grid2 as Grid,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import Navbar from "../components/Navbar";
import OrganizationManagement from "../components/OrganizationManagement";
import { IOrganization, ICoupon } from "../types/Organization.types";

const Dashboard = () => {
  const [coupons, setCoupons] = useState<ICoupon[]>([
    { id: 1, code: "COUPON1", discount: "10% off" },
    { id: 2, code: "COUPON2", discount: "20% off" },
  ]);
  const [openOrganization, setOpenOrganization] = useState(false);
  const [organization, setOrganization] = useState<IOrganization | null>(null);
  const [open, setOpen] = useState(false);
  const [orgName, setOrgName] = useState("");
  const [emails, setEmails] = useState<string[]>([""]);
  const [errors, setErrors] = useState<{ orgName: string; emails: string[] }>({
    orgName: "",
    emails: [""],
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleOrganization = (state: boolean) => setOpenOrganization(state);
  const handleAddEmail = () => {
    setEmails([...emails, ""]);
    setErrors({ ...errors, emails: [...errors.emails, ""] });
  };

  const handleRemoveEmail = (index: number) => {
    const newEmails = emails.filter((_, i) => i !== index);
    const newErrors = errors.emails.filter((_, i) => i !== index);
    setEmails(newEmails);
    setErrors({ ...errors, emails: newErrors });
  };

  const handleEmailChange = (index: number, value: string) => {
    const newEmails = emails.map((email, i) => (i === index ? value : email));
    const newErrors = errors.emails.map((error, i) =>
      i === index ? (value ? "" : "Email is required") : error
    );
    setEmails(newEmails);
    setErrors({ ...errors, emails: newErrors });
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = { orgName: "", emails: [] as string[] };

    if (!orgName) {
      newErrors.orgName = "Organization name is required";
      valid = false;
    }

    emails.forEach((email, index) => {
      if (!email) {
        newErrors.emails[index] = "Email is required";
        valid = false;
      } else if (!validateEmail(email)) {
        newErrors.emails[index] = "Invalid email format";
        valid = false;
      } else {
        newErrors.emails[index] = "";
      }
    });

    setErrors(newErrors);
    return valid;
  };

  const handleCreateOrganization = () => {
    if (validateForm()) {
      // Add logic to create organization
      console.log("Organization Name:", orgName);
      console.log("Emails:", emails);
      handleClose();
    }
  };

  useEffect(() => {
    // Add logic to fetch user coupons
    // api.get("/coupons").then((response) => setCoupons(response.data));
    // Add logic to fetch user organization details
    // api.get("/organization").then((response) => setOrganization(response.data));
  }, []);

  // Functions to manage organization
  const addUserToOrg = (email: string) => {
    setOrganization((prevOrg) =>
      prevOrg
        ? {
            ...prevOrg,
            users: [...prevOrg.users, email],
          }
        : null
    );
  };

  const removeUserFromOrg = (email: string) => {
    setOrganization((prevOrg) =>
      prevOrg
        ? {
            ...prevOrg,
            users: prevOrg.users.filter((user) => user !== email),
          }
        : null
    );
  };

  const addCouponToOrg = (coupon: { code: string; discount: string }) => {
    setOrganization((prevOrg) =>
      prevOrg
        ? {
            ...prevOrg,
            coupons: [
              ...prevOrg.coupons,
              { ...coupon, id: prevOrg.coupons.length + 1 },
            ],
          }
        : null
    );
  };

  const updateCouponInOrg = (coupon: {
    id: number;
    code: string;
    discount: string;
  }) => {
    setOrganization((prevOrg) =>
      prevOrg
        ? {
            ...prevOrg,
            coupons: prevOrg.coupons.map((c) =>
              c.id === coupon.id ? coupon : c
            ),
          }
        : null
    );
  };

  const removeCouponFromOrg = (id: number) => {
    console.log(organization, id);
    setOrganization((prevOrg) =>
      prevOrg
        ? {
            ...prevOrg,
            coupons: prevOrg.coupons.filter((coupon) => coupon.id !== id),
          }
        : null
    );
  };

  return (
    <>
      <Navbar />
      <Container sx={{ marginTop: 8 }}>
        {openOrganization && organization ? (
          <OrganizationManagement
            organization={organization}
            addUserToOrg={addUserToOrg}
            removeUserFromOrg={removeUserFromOrg}
            addCouponToOrg={addCouponToOrg}
            updateCouponInOrg={updateCouponInOrg}
            removeCouponFromOrg={removeCouponFromOrg}
            handleOrganization={handleOrganization}
          />
        ) : (
          <>
            {organization ? (
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleOrganization(true)}
                style={{ marginBottom: "20px" }}
              >
                Manage Organization
              </Button>
            ) : (
              <Button
                variant="contained"
                color="primary"
                onClick={handleOpen}
                style={{ marginBottom: "20px" }}
              >
                Create Organization
              </Button>
            )}
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Coupon Code</TableCell>
                    <TableCell>Description</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {coupons.map((coupon) => (
                    <TableRow key={coupon.id}>
                      <TableCell>{coupon.code}</TableCell>
                      <TableCell>{coupon.discount}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <Modal open={open} onClose={handleClose}>
              <Box
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  width: 400,
                  bgcolor: "background.paper",
                  border: "2px solid #000",
                  boxShadow: 24,
                  p: 4,
                }}
              >
                <Typography variant="h6" component="h2" gutterBottom>
                  Create Organization
                </Typography>
                <TextField
                  label="Organization Name"
                  value={orgName}
                  onChange={(e) => setOrgName(e.target.value)}
                  fullWidth
                  margin="normal"
                  error={!!errors.orgName}
                  helperText={errors.orgName}
                />
                {emails.map((email, index) => (
                  <Grid container spacing={1} alignItems="center" key={index}>
                    <Grid size={{ xs: 10 }}>
                      <TextField
                        label={`Email ${index + 1}`}
                        value={email}
                        type="email"
                        onChange={(e) =>
                          handleEmailChange(index, e.target.value)
                        }
                        fullWidth
                        margin="normal"
                        error={!!errors.emails[index]}
                        helperText={errors.emails[index]}
                      />
                    </Grid>
                    <Grid size={{ xs: 2 }}>
                      <IconButton onClick={() => handleRemoveEmail(index)}>
                        <RemoveIcon />
                      </IconButton>
                    </Grid>
                  </Grid>
                ))}
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    columnGap: "0.5rem",
                    justifyContent: "flex-end",
                    marginTop: "1rem",
                  }}
                >
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleAddEmail}
                    startIcon={<AddIcon />}
                  >
                    Add Email
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleCreateOrganization}
                  >
                    Create
                  </Button>
                </Box>
              </Box>
            </Modal>
          </>
        )}
      </Container>
    </>
  );
};

export default Dashboard;
