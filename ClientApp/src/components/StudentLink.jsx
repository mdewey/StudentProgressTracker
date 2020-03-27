import React from 'react'

import Avatar from '@material-ui/core/Avatar'

const StudentLink = ({ student }) => {
  return (
    <>
      <Link to={`/student/${student.id}`}>
        <header>{student.fullName}</header>
        <p>link to github</p>
        <p>link to nexus</p>
      </Link>
    </>
  )
}

export default StudentLink
