import React, { useEffect, useState } from 'react'
import axios from 'axios'

const StudentDetails = props => {
  const [student, setStudent] = useState({})
  const [progress, setProgress] = useState([{}])
  const { studentId } = props.match.params

  const getStudentData = async () => {
    const resp = axios.get(`/api/student/${studentId}/data`)
    console.log(resp.data)
  }

  useEffect(() => {
    getStudentData()
  }, [])

  return <div>{studentId}</div>
}

export default StudentDetails
