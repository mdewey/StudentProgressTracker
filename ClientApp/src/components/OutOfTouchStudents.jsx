import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import CircularProgress from '@material-ui/core/CircularProgress'
import { makeStyles } from '@material-ui/core/styles'

import auth from '../Auth'

const useStyles = makeStyles({
  container: {
    padding: '1rem',
    marginTop: '0.5rem',
  },
  loader: {
    display: 'flex',
    justifyContent: 'center',
  },
})

const OutOfTouchStudents = ({ cohort = {} }) => {
  const classes = useStyles()
  const [isLoading, setIsLoading] = useState(true)
  const [students, setStudents] = useState([])

  useEffect(() => {
    const callApi = async () => {
      const resp = await axios.get(
        `/api/cohort/${cohort.id}/no/touch`,
        auth.getHeader()
      )
      console.log(resp)
      setStudents(resp.data.students)
      setIsLoading(false)
    }
    if (cohort.id) callApi()
  }, [cohort.id])

  return (
    <Grid item sm={6}>
      <Paper>
        {!isLoading ? (
          <>
            <h3>Students not touched in 48 hours</h3>
            <Grid container spacing={3}>
              {students.map(student => {
                const size =
                  12 / Math.floor(students.length) < 1
                    ? 1
                    : 12 / Math.floor(students.length)
                return (
                  <Grid item sm={size} key={student.id}>
                    <Link to={`/student/${student.id}`}>
                      {student.fullName} ({student.lastTouchedadd})
                    </Link>
                  </Grid>
                )
              })}
            </Grid>
          </>
        ) : (
          <section className={classes.loader}>
            <CircularProgress />
          </section>
        )}
      </Paper>
    </Grid>
  )
}

export default OutOfTouchStudents
