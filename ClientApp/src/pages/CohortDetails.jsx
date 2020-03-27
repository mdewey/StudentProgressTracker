import React, { useEffect, useState } from 'react'
import axios from 'axios'

import { makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import Avatar from '@material-ui/core/Avatar'
import { Link } from 'react-router-dom'

const useStyles = makeStyles({
  table: {
    width: '100%',
  },
})

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein }
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
]

const CohortDetails = props => {
  const classes = useStyles()
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
      <h2>{cohort.name}</h2>
      <hr />
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>&nbsp;</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>GitHub</TableCell>
              <TableCell>Nexus</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {students.map(student => (
              <TableRow key={student.id}>
                <TableCell>
                  <Avatar
                    alt={student.fullName}
                    src={`https://api.adorable.io/avatars/200/${Math.random()} `}
                  />
                </TableCell>
                <TableCell component="th" scope="row">
                  <Link to={`/student/${student.id}`}> {student.fullName}</Link>
                </TableCell>
                <TableCell>
                  <a
                    href={`https://www.github.com/${student.gitHub}`}
                    target="_blank"
                  >
                    {student.gitHub}
                  </a>
                </TableCell>
                <TableCell>
                  <a
                    href={`https://nexus.suncoast.io/people/${student.pylonId}/gradebook`}
                    target="_blank"
                  >
                    nexus
                  </a>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default CohortDetails
