import React from 'react'
import { Link } from 'react-router-dom'

const StudentLink = ({ student }) => {
  return (
    <li>
      <Link to={`/student/${student.id}`}>
        <header>{student.fullName}</header>
      </Link>
    </li>
  )
}

export default StudentLink
