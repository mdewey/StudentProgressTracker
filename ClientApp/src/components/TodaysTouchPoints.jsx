import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'

import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import CircularProgress from '@material-ui/core/CircularProgress'

import auth from '../Auth'

const useStyles = makeStyles(theme => ({
  section: {
    padding: '1rem',
  },
}))

const TodaysTouchPoints = ({ cohort = {} }) => {
  const classes = useStyles()

  const [touchPoints, setTouchPoints] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      const resp = await axios.get(
        `/api/cohort/${cohort.id}/touchpoints/today`,
        auth.getHeader()
      )
      setTouchPoints(resp.data)
      setIsLoading(false)
    }
    if (cohort.id) {
      loadData()
    }
  }, [cohort.id])

  return (
    <Paper className={classes.section} elevation={5}>
      <h5>Today's Touch points</h5>
      {isLoading ? (
        <section className={classes.loader}>
          <CircularProgress />
        </section>
      ) : touchPoints.length === 0 ? (
        <>
          <div className="message">No one yet...</div>
        </>
      ) : (
        <List className={classes.root}>
          {touchPoints.map(point => {
            return (
              <>
                <ListItem alignItems="flex-start">
                  <ListItemText
                    primary={
                      <>
                        <Link to={`/student/${point.studentId}`}>
                          {point.fullName}
                        </Link>
                      </>
                    }
                    secondary={
                      <>
                        <Typography
                          component="span"
                          variant="body2"
                          color="textPrimary"
                        >
                          {point.timestamp}
                        </Typography>
                      </>
                    }
                  />
                </ListItem>
                <Divider component="li" />
              </>
            )
          })}
        </List>
      )}
    </Paper>
  )
}

export default TodaysTouchPoints
