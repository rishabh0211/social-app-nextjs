import CircularProgress from "@material-ui/core/CircularProgress";
import Drawer from "@material-ui/core/Drawer";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import withStyles from "@material-ui/core/styles/withStyles";
import { authInitialProps } from "../lib/auth";
import Router from "next/router";
import { Fab } from "@material-ui/core";
import PostFeed from "../components/index/PostFeed";
import UserFeed from "../components/index/UserFeed";

const Index = ({ auth, classes}) => {
  return (
    <main className={classes.root}>
      {auth.user && auth.user._id ? (
        <Grid container>
          <Grid item xs={12} sm={12} md={7}>
            <PostFeed auth={auth}/>
          </Grid>
          <Grid item className={classes.drawerContainer}>
            <Drawer
              className={classes.drawer}
              variant="permanent"
              anchor="right"
              classes={{
                paper: classes.drawerPaper
              }}
            >
              <UserFeed auth={auth} />
            </Drawer>
          </Grid>
        </Grid>
      ): (
        <Grid
          justify="center"
          alignItems="center"
          direction="row"
          container
          className={classes.heroContent}
        >
          <Typography variant="h2" component="h1" align="center" color="textPrimary" gutt>
            Your Social Buddy
          </Typography>
          <Typography variant="h6" align="center" color="textSecondary" component="p">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Laboriosam laborum soluta autem doloribus! Voluptates dolor mollitia vitae fugiat expedita? Ab doloremque adipisci nobis vitae tempore laborum a distinctio iusto totam.
          </Typography>
          <Fab className={classes.fabButton}
          variant="extended"
          color="primary"
          onClick={() => Router.push('/signup')}
          >Get Started
          </Fab>
        </Grid>
      )}
    </main>
  );
}

const styles = theme => ({
  root: {
    paddingTop: theme.spacing.unit * 10,
    paddingLeft: theme.spacing.unit * 5,
    [theme.breakpoints.down("sm")]: {
      paddingRight: theme.spacing.unit * 5
    }
  },
  progressContainer: {
    height: "80vh"
  },
  progress: {
    margin: theme.spacing.unit * 2,
    color: theme.palette.secondary.light
  },
  drawerContainer: {
    [theme.breakpoints.down("sm")]: {
      display: "none"
    }
  },
  drawer: {
    width: 350
  },
  drawerPaper: {
    marginTop: 70,
    width: 350
  },
  fabButton: {
    margin: theme.spacing.unit * 3
  },
  heroContent: {
    maxWidth: 600,
    paddingTop: theme.spacing.unit * 8,
    paddingBottom: theme.spacing.unit * 6,
    margin: "0 auto"
  }
});

Index.getInitialProps = authInitialProps();

export default withStyles(styles)(Index);
