import React, { useState, useEffect } from 'react'
import axios from 'axios'
const PullStudents = () => {
  const [availableCohorts, setAvailableCohorts] = useState([])

  const getSLTCohorts = async () => {
    const resp = await axios.get('/api/cohort')
    console.log(resp)
    setAvailableCohorts(resp.data)
  }

  const syncStudents = async cohort => {
    const resp = await axios.post(`/api/nexus/cohorts/${cohort.id}/students`)
    console.log(resp)
  }

  useEffect(() => {
    getSLTCohorts()
  }, [])
  return (
    <div>
      <h1>Pull over all Students</h1>
      <section>
        <h2>Select Cohort</h2>
        <section>
          {availableCohorts.map(cohort => {
            return (
              <section key={cohort.id}>
                {cohort.name}
                <button onClick={() => syncStudents(cohort)}>
                  sync students
                </button>
              </section>
            )
          })}
        </section>
      </section>
    </div>
  )
}

export default PullStudents
