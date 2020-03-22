import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Home = () => {
  const [currentCohort, setCurrentCohort] = useState({})
  const [allCohorts, setAllCohorts] = useState([])

  const getAllCohorts = async () => {
    const resp = await axios.get('/api/cohort')
    setAllCohorts(resp.data)
    // NEXT: CONTINUE THE DASHBOARD
  }

  useEffect(() => {
    getAllCohorts()
  }, [])

  return (
    <div>
      <section>
        <header>Current Cohorts</header>
      </section>
      <section>
        <header>All Cohorts</header>
        <ul>
          {allCohorts.map(cohort => {
            return <li>{cohort.name}</li>
          })}
        </ul>
      </section>
    </div>
  )
}

export default Home
