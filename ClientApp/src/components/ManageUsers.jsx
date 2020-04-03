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
import auth from '../Auth'

const useStyles = makeStyles({
  table: {
    width: '100%',
  },
})

const ManageUsers = props => {
  const classes = useStyles()
  const [users, setUsers] = useState([])

  useEffect(() => {}, [])
  return (
    <div>
      <h2>Promote Users</h2>
      <hr />
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>&nbsp;</TableCell>
              <TableCell>Id</TableCell>
              <TableCell>GitHub</TableCell>
              <TableCell>Allowed</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map(user => (
              <TableRow key={user.id}>
                <TableCell>
                  <Avatar
                    alt={user.pylonId}
                    src={`https://api.adorable.io/avatars/200/${Math.random()} `}
                  />
                </TableCell>
                <TableCell component="th" scope="row">
                  {user.pylonId}
                </TableCell>
                <TableCell>{user.gitHub}</TableCell>
                <TableCell>{user.isAllowed ? 'admin' : 'not admin'}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default ManageUsers
