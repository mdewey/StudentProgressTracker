import React, { useEffect, useState } from 'react'
import axios from 'axios'
import moment from 'moment'
import { createBrotliCompress } from 'zlib'
import CohortLink from '../components/CohortLink'

const Home = () => {
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
      <section>
        <header>Current Cohorts</header>
        <ul>
          {currentCohorts.map(cohort => {
            return <CohortLink key={cohort.id} cohort={cohort} />
          })}
        </ul>
      </section>
      <section>
        <header>All Cohorts</header>
        <ul>
          {allCohorts.map(cohort => {
            return <CohortLink key={cohort.id} cohort={cohort} />
          })}
        </ul>
      </section>
    </div>
  )
}

export default Home
