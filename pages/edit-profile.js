import Avatar from "@material-ui/core/Avatar";
import FormControl from "@material-ui/core/FormControl";
import Paper from "@material-ui/core/Paper";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import Snackbar from "@material-ui/core/Snackbar";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import VerifiedUserTwoTone from "@material-ui/icons/VerifiedUserTwoTone";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import CloudUpload from "@material-ui/icons/CloudUpload";
import FaceTwoTone from "@material-ui/icons/FaceTwoTone";
import EditSharp from "@material-ui/icons/EditSharp";
import withStyles from "@material-ui/core/styles/withStyles";
import { authInitialProps } from "../lib/auth";
import { useEffect, useState } from "react";
import { getAuthUser, updateUser } from "../lib/api";
import Router from "next/router";
import Slide from "@material-ui/core/Slide";

function Transition(props) {
  return <Slide direction="up" {...props} />
}

const EditProfile = ({ auth, classes }) => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    avatar: {},
    about: '',
    _id: ''
  });
  const [avatarPreview, setAvatarPreview] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(true);
  const [openError, setOpenError] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    getAuthUser(auth.user._id)
      .then(userData => {
        let data = {
          name: userData.name,
          email: userData.email,
          avatar: userData.avatar,
          about: userData.about,
          _id: userData._id
        };
        setUser(data);
        setIsLoading(false);
      }).catch(err => {
        console.log(err);
      });
  }, []);

  const handleChange = event => {
    let { name, value } = event.target;
    if (name === "avatar") {
      value = event.target.files[0];
      setAvatarPreview(createPreviewImage(value));
    }
    setUser({
      ...user,
      [name]: value
    });
  };

  const handleSubmit = event => {
    event.preventDefault();
    setIsSaving(true);
    let userData = new FormData();
    for (let key in user) {
      userData.set(key, user[key]);
    }
    updateUser(user._id, userData)
      .then(updatedUser => {
        setIsSaving(false);
        setOpenSuccess(true);
        setTimeout(() => Router.push(`/profile/${user._id}`), 2000);
      }).catch(showError);
  };

  const createPreviewImage = file => URL.createObjectURL(file);

  const showError = (err) => {
    setIsSaving(false);
    setOpenError(true);
    setError(err.message);
  };

  const handleClose = () => {
    setOpenError(false);
  };

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Avatar className={classes.avatar}>
          <EditSharp />
        </Avatar>
        <Typography variant="h5" component="h1">
          Edit profile
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          {isLoading ? (
            <Avatar className={classes.bigAvatar}>
              <FaceTwoTone />
            </Avatar>
          ) : (
              <Avatar src={avatarPreview || user.avatar} className={classes.bigAvatar} />
            )}
          <input
            type="file"
            name="avatar"
            id="avatar"
            accept="image/*"
            onChange={handleChange}
            className={classes.input}
          />
          <label htmlFor="avatar" className={classes.uploadButton}>
            <Button variant="contained" color="secondary" component="span">
              Upload Image <CloudUpload />
            </Button>
          </label>
          <span className={classes.filename}>
            {user.avatar && user.avatar.name}
          </span>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="name">Name</InputLabel>
            <Input
              type="text"
              name="name"
              value={user.name}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl margin="normal" fullWidth>
            <InputLabel htmlFor="about">About</InputLabel>
            <Input
              type="text"
              name="about"
              value={user.about || ''}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="email">Email</InputLabel>
            <Input
              type="text"
              name="email"
              value={user.email}
              onChange={handleChange}
            />
          </FormControl>
          <Button
            type="submit"
            fullWidth
            disabled={isLoading || isSaving}
            color="primary"
            variant="contained"
            className={classes.submit}
          >{isSaving ? "Saving..." : "Save"}</Button>
        </form>
      </Paper>
      {error && <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right'
        }}
        open={openError}
        onClose={handleClose}
        autoHideDuration={6000}
        message={<span className={classes.snack}>{error}</span>}
      />}
      <Dialog
        open={openSuccess}
        disableBackdropClick={true}
        TransitionComponent={Transition}
      >
        <DialogTitle>
          <VerifiedUserTwoTone className={classes.icon} />
          Profile Updated
          </DialogTitle>
        <DialogContent>
          <DialogContentText>
            User {user.name} was successfully updated!
            </DialogContentText>
        </DialogContent>
      </Dialog>
    </div>
  );
}

const styles = theme => ({
  root: {
    width: "auto",
    display: "block",
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up("md")]: {
      width: 400,
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  bigAvatar: {
    width: 60,
    height: 60,
    margin: "auto"
  },
  uploadButton: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "0.25em"
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: theme.spacing.unit * 2
  },
  signinLink: {
    textDecoration: "none",
    color: "white"
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%",
    marginTop: theme.spacing.unit
  },
  submit: {
    marginTop: theme.spacing.unit * 2
  },
  snack: {
    color: theme.palette.secondary.light
  },
  icon: {
    padding: "0px 2px 2px 0px",
    verticalAlign: "middle",
    color: "green"
  },
  input: {
    display: "none"
  }
});

EditProfile.getInitialProps = authInitialProps(true);

export default withStyles(styles)(EditProfile);
