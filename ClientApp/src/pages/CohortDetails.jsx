import React, { useEffect, useState } from 'react'
import axios from 'axios'
import StudentLink from '../components/StudentLink'

const CohortDetails = props => {
  const { cohortId } = props.match.params
  const [cohort, setCohort] = useState({})
  const [students, setStudents] = useState([])
  const getCohortData = async () => {
    const resp = await axios.get(`/api/cohort/${cohortId}/data`)
    console.log(resp.data)
    setCohort(resp.data.cohort)
    setStudents(resp.data.students)
  }
  useEffect(() => {
    console.log(cohortId)
    getCohortData()
  }, [])
  return (
    <div>
      <section>Cohort {cohort.name}</section>
      <section>
        <header>students</header>
        <ul>
          {students.map(student => (
            <StudentLink student={student} />
          ))}
        </ul>
      </section>
    </div>
  )
}

export default CohortDetails
