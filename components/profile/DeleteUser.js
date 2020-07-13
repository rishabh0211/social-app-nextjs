import { useState } from "react";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Delete from "@material-ui/icons/Delete";
import Router from "next/router";
import { signoutUser } from "../../lib/auth";
import { deleteUser } from "../../lib/api";

const DeleteUser = ({ user }) => {
  const [open, setOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteUser = () => {
    setIsDeleting(true);
    deleteUser(user._id)
      .then(() => {
        signoutUser();
      }).catch(err => {
        console.log(err);
        setIsDeleting(false);
      });
  };

  const handleOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);

  return (
    <div>
      <IconButton onClick={handleOpen} color="secondary">
        <Delete />
      </IconButton>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Delete Account</DialogTitle>
        <DialogContent>
          Confirm to delete your account
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">Cancel</Button>
          <Button onClick={handleDeleteUser} color="secondary" disabled={isDeleting} >
            {isDeleting ? "Deleting..." : "Confirm"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default DeleteUser;
