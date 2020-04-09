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
const TopConcernedStudents = ({ cohort = {} }) => {
  const classes = useStyles()
  const [isLoading, setIsLoading] = useState(true)
  const [students, setStudents] = useState([])
  const [numberOfConcerned, setNumberOfConcerned] = useState(12)

  useEffect(() => {
    const getTopX = async () => {
      const resp = await axios.get(
        `/api/cohort/${cohort.id}/concerned`,
        auth.getHeader()
      )
      console.log(resp)
      setStudents(resp.data.students)
      setIsLoading(false)
      setNumberOfConcerned(resp.data.students.length)
    }
    if (cohort.id) getTopX()
  }, [cohort.id])

  return (
    <Paper className={classes.container}>
      {!isLoading ? (
        <>
          <h4>{numberOfConcerned} most concerned students</h4>
          <Grid container spacing={3}>
            {students.map(student => {
              const size =
                12 / Math.floor(numberOfConcerned) < 1
                  ? 1
                  : 12 / Math.floor(numberOfConcerned)
              return (
                <Grid item sm={size} key={student.id}>
                  <Link to={`/student/${student.id}`}>
                    {student.fullName} ({student.concernedLevel})
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
  )
}

export default TopConcernedStudents
