import React, { useEffect, useState } from 'react'
import axios from 'axios'

import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'

import { Link } from 'react-router-dom'
import auth from '../Auth'
import TouchPointQuickAdd from '../components/TouchPointQuickAdd'
import StudentSearch from '../components/StudentSearch'
import TopConcernedStudents from '../components/TopConcernedStudents'
import OutOfTouchStudents from '../components/OutOfTouchStudents'
const useStyles = makeStyles({
  table: {
    width: '100%',
  },
})

const CohortDashboard = props => {
  const classes = useStyles()
  const { cohortId } = props.match.params
  const [cohort, setCohort] = useState({})
  const [students, setStudents] = useState([])
  const getCohortData = async () => {
    const resp = await axios.get(
      `/api/cohort/${cohortId}/data`,
      auth.getHeader()
    )
    console.log(resp.data)
    setCohort(resp.data.cohort)
    setStudents(resp.data.students)
  }
  useEffect(() => {
    console.log(cohortId)
    getCohortData()
  }, [])
  return (
    <>
      <h2>{cohort.name}</h2>
      <Grid container spacing={2}>
        <Grid item md={6}>
          <TouchPointQuickAdd students={students} />
        </Grid>
        <Grid item md={6}>
          <StudentSearch students={students} cohort={cohort} />
          <TopConcernedStudents cohort={cohort} />
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <OutOfTouchStudents cohort={cohort} />
        <Grid item sm={6}>
          <h3>total today</h3>5 most recent touch points
        </Grid>
      </Grid>
      {/* <section>
        Details
        <section></section>
        <section>
          
        </section>
        <section></section>
      </section> */}
    </>
  )
}

export default CohortDashboard
