import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

import auth from '../Auth'
const useStyles = makeStyles({
  root: {
    maxWidth: 445,
  },
  media: {
    height: 240,
  },
  container: {
    height: '100vh',
    width: '100wh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
})

const NoAuthed = () => {
  const classes = useStyles()

  return (
    <div className={classes.container}>
      <Card className={classes.root}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image="https://placekitten.com/445/240"
            title="Contemplative Kitty"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              Permission Denied
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </div>
  )
}

export default NoAuthed
