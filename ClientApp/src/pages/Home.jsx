import React, { useEffect, useState } from 'react'
import axios from 'axios'
import moment from 'moment'
import { createBrotliCompress } from 'zlib'
import CohortCard from '../components/CohortCard'

import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
}))

const Home = () => {
  const classes = useStyles()
  const [currentCohorts, setCurrentCohorts] = useState([])
  const [allCohorts, setAllCohorts] = useState([])

  const getAllCohorts = async () => {
    const resp = await axios.get('/api/cohort')
    setAllCohorts(resp.data)
    const current = resp.data.filter(cohort => {
      return moment().isBetween(cohort.startDate, cohort.endDate)
    })
    setCurrentCohorts(current)
  }

  useEffect(() => {
    getAllCohorts()
  }, [])

  return (
    <div>
      <br />
      <section>
        <h2>Current Cohorts</h2>
        <hr />
        {currentCohorts.map(cohort => {
          return <CohortCard key={cohort.id} cohort={cohort} />
        })}
        <br />
      </section>
      <section className={classes.root}>
        <h3>All Cohorts</h3>
        <hr />
        <Grid container spacing={3}>
          {allCohorts.map(cohort => {
            return (
              <Grid item xs>
                <CohortCard key={cohort.id} cohort={cohort} />
              </Grid>
            )
          })}
        </Grid>
      </section>
    </div>
  )
}

export default Home
