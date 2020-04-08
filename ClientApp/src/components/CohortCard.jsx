import React from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'

import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
const useStyles = makeStyles({
  root: {
    maxWidth: 200,
  },
  media: {
    height: 200,
  },
})

const CohortCard = ({ cohort }) => {
  const classes = useStyles()
  const bull = <span className={classes.bullet}>•</span>

  return (
    <>
      <Link to={`/cohort/${cohort.id}/dashboard`} className="cohort-card">
        <Card className={classes.root}>
          <CardActionArea>
            <CardMedia
              className={classes.media}
              image={`https://api.adorable.io/avatars/200/${cohort.name}`}
              title="Contemplative Reptile"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                <div>{cohort.name}</div>
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Link>
    </>
  )
}

export default CohortCard
