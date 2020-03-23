import React, { useEffect } from 'react'
import axios from 'axios'

const CohortDetails = props => {
  const { cohortId } = props.match.params
  const getCohortData = async () => {
    const resp = await axios.get('/api/cohort/' + cohortId)
    console.log(resp.data)
  }
  useEffect(() => {
    console.log(cohortId)
    getCohortData()
  })
  return (
    <div>
      <section>Cohort NAME</section>
      <section>
        <header>students</header>
        <ul>
          <li>
            <header>Jim Smith</header>
            <p>concerned level : 0</p>
          </li>
        </ul>
      </section>
    </div>
  )
}

export default CohortDetails
