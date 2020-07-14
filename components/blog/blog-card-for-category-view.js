import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Hidden from '@material-ui/core/Hidden';

import moment from 'moment';
import renderHTML from 'react-render-html';
import { IMG } from '../../config';


const useStyles = makeStyles({
  card: {
    display: 'flex',
  },
  cardDetails: {
    flex: 1,
  },
  cardMedia: {
    width: 160,
  },
});

const BlogCardForCatView=({post})=> {
  const classes = useStyles();
  

  return (
    <Grid item xs={12} md={6}>
      <CardActionArea component="a" href={`/blog/${post.slug}`}>
        <Card className={classes.card}>
          <div className={classes.cardDetails}>
            <CardContent>
              <Typography component="h2" variant="h5">
                {post.title}
              </Typography>
              <Typography variant="subtitle1" color="textSecondary">
                {moment(post.updatedAt).fromNow()}
              </Typography>
              <div className='MuiTypography-root MuiTypography-body1'>

                {renderHTML(post.excerpt)}
              </div>
              
              <Typography variant="subtitle1" color="primary">
                Continue reading...
              </Typography>
            </CardContent>
          </div>
          <Hidden xsDown>
            <CardMedia className={classes.cardMedia} image={`${IMG}/${post.photo}`} title={post.imageTitle} />
          </Hidden>
        </Card>
      </CardActionArea>
    </Grid>
  );
}

export default BlogCardForCatView;