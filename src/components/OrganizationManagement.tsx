import React, { useState } from "react";
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
} from "@mui/material";
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";
import { IOrganization, ICoupon } from "../types/Organization.types";

interface OrganizationManagementProps {
  organization: IOrganization;
  addUserToOrg: (email: string) => void;
  removeUserFromOrg: (email: string) => void;
  addCouponToOrg: (coupon: { name: string; discount: string }) => void;
  updateCouponInOrg: (coupon: {
    _id: string;
    name: string;
    discount: string;
  }) => void;
  removeCouponFromOrg: (_id: string) => void;
  handleOrganization: (state: boolean) => void;
}

const OrganizationManagement: React.FC<OrganizationManagementProps> = ({
  organization,
  addUserToOrg,
  removeUserFromOrg,
  addCouponToOrg,
  updateCouponInOrg,
  removeCouponFromOrg,
  handleOrganization,
}) => {
  const [openUserModal, setOpenUserModal] = useState(false);
  const [openCouponModal, setOpenCouponModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [currentCoupon, setCurrentCoupon] = useState<ICoupon | null>(null);
  const [currentUser, setCurrentUser] = useState<string | null>(null);
  const [newUserEmail, setNewUserEmail] = useState("");
  const [newCoupon, setNewCoupon] = useState({ name: "", discount: "" });

  const handleOpenUserModal = () => setOpenUserModal(true);
  const handleCloseUserModal = () => setOpenUserModal(false);

  const handleOpenCouponModal = (coupon: ICoupon | null = null) => {
    setCurrentCoupon(coupon);
    setNewCoupon(
      coupon
        ? { name: coupon.name, discount: coupon.discount }
        : { name: "", discount: "" }
    );
    setOpenCouponModal(true);
  };
  const handleCloseCouponModal = () => setOpenCouponModal(false);

  const handleOpenDeleteModal = (
    item: string | ICoupon,
    type: "user" | "coupon"
  ) => {
    if (type === "user") {
      setCurrentUser(item as string);
      setCurrentCoupon(null);
    } else {
      setCurrentCoupon(item as ICoupon);
      setCurrentUser(null);
    }
    setOpenDeleteModal(true);
  };
  const handleCloseDeleteModal = () => setOpenDeleteModal(false);

  const handleAddUser = () => {
    addUserToOrg(newUserEmail);
    setNewUserEmail("");
    handleCloseUserModal();
  };

  const handleDeleteUser = () => {
    if (currentUser) {
      removeUserFromOrg(currentUser);
      handleCloseDeleteModal();
    }
  };

  const handleAddCoupon = () => {
    if (currentCoupon) {
      updateCouponInOrg({ ...newCoupon, _id: currentCoupon._id });
    } else {
      addCouponToOrg(newCoupon);
    }
    setNewCoupon({ name: "", discount: "" });
    handleCloseCouponModal();
  };

  const handleDeleteCoupon = () => {
    if (currentCoupon) {
      removeCouponFromOrg(currentCoupon._id);
      handleCloseDeleteModal();
    }
  };

  return (
    <Container>
      <Box sx={{ display: "flex", columnGap: "0.5rem" }}>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => handleOrganization(false)}
          style={{ marginBottom: "20px" }}
        >
          Back
        </Button>
        <Typography variant="h5" gutterBottom>
          Manage Organization
        </Typography>
      </Box>
      <Typography variant="h6" gutterBottom>
        Users
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={handleOpenUserModal}
        startIcon={<AddIcon />}
      >
        Add User
      </Button>
      <TableContainer component={Paper} style={{ marginTop: "20px" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Email</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {organization.users.map((user) => (
              <TableRow key={user._id}>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <IconButton
                    onClick={() => handleOpenDeleteModal(user._id, "user")}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Typography variant="h6" gutterBottom style={{ marginTop: "40px" }}>
        Coupons
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => handleOpenCouponModal()}
        startIcon={<AddIcon />}
      >
        Create Coupon
      </Button>
      <TableContainer component={Paper} style={{ marginTop: "20px" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Coupon Code</TableCell>
              <TableCell>Discount Amount</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {organization.coupons.map((coupon) => (
              <TableRow key={coupon.id}>
                <TableCell>{coupon.name}</TableCell>
                <TableCell>{coupon.discount}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleOpenCouponModal(coupon)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    onClick={() => handleOpenDeleteModal(coupon, "coupon")}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Add/Edit User Modal */}
      <Modal open={openUserModal} onClose={handleCloseUserModal}>
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
            Add User
          </Typography>
          <TextField
            label="Email"
            value={newUserEmail}
            onChange={(e) => setNewUserEmail(e.target.value)}
            fullWidth
            margin="normal"
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddUser}
            style={{ marginTop: "20px" }}
          >
            Add
          </Button>
        </Box>
      </Modal>

      {/* Add/Edit Coupon Modal */}
      <Modal open={openCouponModal} onClose={handleCloseCouponModal}>
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
            {currentCoupon ? "Edit Coupon" : "Create Coupon"}
          </Typography>
          <TextField
            label="Coupon Code"
            value={newCoupon.name}
            onChange={(e) =>
              setNewCoupon({ ...newCoupon, name: e.target.value })
            }
            fullWidth
            margin="normal"
          />
          <TextField
            label="Discount Amount"
            value={newCoupon.discount}
            onChange={(e) =>
              setNewCoupon({ ...newCoupon, discount: e.target.value })
            }
            fullWidth
            margin="normal"
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddCoupon}
            style={{ marginTop: "20px" }}
          >
            {currentCoupon ? "Save" : "Create"}
          </Button>
        </Box>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal open={openDeleteModal} onClose={handleCloseDeleteModal}>
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
            Confirm Deletion
          </Typography>
          <Typography variant="body1" gutterBottom>
            Are you sure you want to delete this{" "}
            {currentUser ? "user" : "coupon"}?
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            onClick={() =>
              currentUser ? handleDeleteUser() : handleDeleteCoupon()
            }
            style={{ marginTop: "20px" }}
          >
            Delete
          </Button>
        </Box>
      </Modal>
    </Container>
  );
};

export default OrganizationManagement;
