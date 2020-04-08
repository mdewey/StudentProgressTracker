import React from 'react'
import { Link } from 'react-router-dom'

import Paper from '@material-ui/core/Paper'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
  spaced: {
    width: '100%',
    paddingTop: '1rem',
  },
  quickTouch: {
    padding: '1rem',
  },
})

const ViewAllStudents = ({ cohort = {} }) => {
  const classes = useStyles()
  return (
    <Paper className={classes.quickTouch}>
      <Link to={`/cohort/${cohort.id}`}>
        <h5 className={classes.spaced}>View All Students</h5>
      </Link>
    </Paper>
  )
}

export default ViewAllStudents
