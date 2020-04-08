import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'

import Paper from '@material-ui/core/Paper'
import Divider from '@material-ui/core/Divider'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import MenuItem from '@material-ui/core/MenuItem'
import LinearProgress from '@material-ui/core/LinearProgress'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
  spaced: {
    width: '100%',
    paddingTop: '1rem',
  },
  quickTouch: {
    padding: '1rem',
  },
})

const StudentSearch = ({ students = [] }) => {
  const classes = useStyles()
  const [studentId, setStudentId] = useState(0)

  const [found, setFound] = useState(false)

  useEffect(() => {
    console.log(studentId)
    if (studentId) {
      setFound(true)
    }
  }, [studentId])

  if (found) {
    return <Redirect to={`/student/${studentId}`} />
  } else {
    return (
      <Paper className={classes.quickTouch}>
        <h5 className={classes.spaced}>Select a student</h5>
        <TextField
          select
          className={classes.spaced}
          label="Who???"
          value={studentId}
          onChange={e => setStudentId(e.target.value)}
        >
          {students.map(option => (
            <MenuItem key={option.id} value={option.id}>
              {option.fullName}
            </MenuItem>
          ))}
        </TextField>
      </Paper>
    )
  }
}

export default StudentSearch
