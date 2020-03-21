import React, { useState, useEffect } from 'react'
import axios from 'axios'

const PullCohorts = () => {
  const [nexusCohorts, setNexusCohorts] = useState([])
  const [studentProgressCohort, setStudentProgressCohort] = useState([])

  const getNexusCohorts = async () => {
    const resp = await axios.get('/api/nexus/cohorts')
    console.log(resp)
    setNexusCohorts(resp.data.data)
  }

  const getSLTCohorts = async () => {
    const resp = await axios.get('/api/cohort')
    console.log(resp)
    setStudentProgressCohort(resp.data)
  }

  useEffect(() => {
    getNexusCohorts()
    getSLTCohorts()
  }, [])

  const saveCohort = async cohort => {
    const data = {
      pylonId: parseInt(cohort.id),
      name: cohort.attributes.name,
      startDate: cohort.attributes.start_date,
      endDate: cohort.attributes.end_date,
    }
    const resp = await axios.post('/api/cohort', data)
    setStudentProgressCohort([...studentProgressCohort, resp.data])
  }

  return (
    <div>
      <h1>Pulling in Cohorts</h1>
      <section>
        <h2>Pylon</h2>
        <ul>
          {nexusCohorts.map(cohort => {
            return (
              <li key={cohort.id}>
                {cohort.attributes.name}
                {studentProgressCohort.some(c => c.pylonId == cohort.id) ? (
                  <>✅</>
                ) : (
                  <button onClick={() => saveCohort(cohort)}>
                    save to SLT
                  </button>
                )}
              </li>
            )
          })}
        </ul>
      </section>
      <section>
        <h2>SLT</h2>
        <ul>
          {studentProgressCohort.map(cohort => {
            return <li key={cohort.id}>{cohort.name}</li>
          })}
        </ul>
      </section>
    </div>
  )
}

export default PullCohorts
