import Badge from "@material-ui/core/Badge";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Divider from "@material-ui/core/Divider";
import Avatar from "@material-ui/core/Avatar";
import Comment from "@material-ui/icons/Comment";
import DeleteTwoTone from "@material-ui/icons/DeleteTwoTone";
import Favorite from "@material-ui/icons/Favorite";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";
import withStyles from "@material-ui/core/styles/withStyles";
import Link from "next/link";

class Post extends React.Component {
  state = {};

  render() {
    const { auth, classes, post } = this.props;
    return (
      <Card className={classes.card}>
        <CardHeader 
          avatar={<Avatar src={post.postedBy.avatar} />}
          title={
            <Link href={`/profile/${post.postedBy._id}`}>
              <a>{post.postedBy.name}</a>
            </Link>}
          subheader={post.createdAt}
          className={classes.cardHeader}
        />
        <CardContent className={classes.cardContent}>
          <Typography variant="body" className={classes.text}>
            {post.text}
          </Typography>
          {post.image && (
            <div className={classes.imageContainer}>
              <img className={classes.image} src={post.image}/>
            </div>
          )}
        </CardContent>
        <CardActions>
          <IconButton className={classes.button}>
            <Badge badgeContent={0} color="secondary">
              <FavoriteBorder className={classes.favoriteIcon} />
            </Badge>
          </IconButton>
          <IconButton className={classes.button}>
            <Badge badgeContent={0} color="primary">
              <Comment className={classes.commentIcon} />
            </Badge>
          </IconButton>
        </CardActions>
        <Divider />
      </Card>
    );
  }
}

const styles = theme => ({
  card: {
    marginBottom: theme.spacing.unit * 3
  },
  cardContent: {
    backgroundColor: "white"
  },
  cardHeader: {
    paddingTop: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    backgroundColor: "rgba(11, 61, 130, 0.06)"
  },
  imageContainer: {
    textAlign: "center",
    padding: theme.spacing.unit
  },
  image: {
    height: 200
  },
  favoriteIcon: {
    color: theme.palette.favoriteIcon
  },
  commentIcon: {
    color: theme.palette.commentIcon
  }
});

export default withStyles(styles)(Post);
