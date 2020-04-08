import React, { useEffect, useState } from 'react'
import axios from 'axios'

import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'

import { Link } from 'react-router-dom'
import auth from '../Auth'
import TouchPointQuickAdd from '../components/TouchPointQuickAdd'
import StudentSearch from '../components/StudentSearch'
import ViewAllStudents from '../components/ViewAllStudents'
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
      <Grid container spacing={3}>
        <Grid item sm={6}>
          <TouchPointQuickAdd students={students} />
        </Grid>
        <Grid item sm={6}>
          <StudentSearch students={students} />
          <ViewAllStudents cohort={cohort} />
        </Grid>
      </Grid>
      {/* <section>
        Details
        <section>Touch points over 48 hours ago</section>
        <section>
          <h3>total today</h3>5 most recent touch points
        </section>
        <section>top concerned students</section>
      </section> */}
    </>
  )
}

export default CohortDashboard
