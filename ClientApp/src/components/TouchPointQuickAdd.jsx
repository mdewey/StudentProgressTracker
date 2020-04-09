import React, { useState } from 'react'
import axios from 'axios'

import Paper from '@material-ui/core/Paper'
import TextareaAutosize from '@material-ui/core/TextareaAutosize'
import Divider from '@material-ui/core/Divider'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import MenuItem from '@material-ui/core/MenuItem'
import LinearProgress from '@material-ui/core/LinearProgress'
import { makeStyles } from '@material-ui/core/styles'

import auth from '../Auth'

const useStyles = makeStyles({
  quickTouch: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: '1rem',
    width: '100%',
  },
  spaced: {
    margin: '1rem',
  },
  loader: {
    height: '0.25rem',
  },
})

const TouchPointQuickAdd = ({ cohort, students = [] }) => {
  const classes = useStyles()
  const [studentId, setStudentId] = useState()
  const [newTouchPoint, setNewTouchPoint] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const addTouchPoint = async id => {
    if (newTouchPoint && id) {
      setIsLoading(true)
      const resp = await axios.post(
        `/api/student/${id}/touchpoint`,
        {
          description: newTouchPoint,
        },
        auth.getHeader()
      )
      if (resp.status === 200) {
        setNewTouchPoint('')
        setIsLoading(false)
      }
    }
  }
  return (
    <>
      <Paper className={classes.quickTouch}>
        {isLoading ? (
          <LinearProgress variant="query" className={classes.loader} />
        ) : (
          <div className={classes.loader} />
        )}
        {/* capstoneIdea: null */}

        <h5 className={classes.spaced}>Quick Touch</h5>

        <TextareaAutosize
          aria-label="capstone label"
          rowsMin={3}
          className={classes.spaced}
          placeholder="Add a new touch point"
          value={newTouchPoint}
          onChange={e => setNewTouchPoint(e.target.value)}
        />
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
        <Button
          className={classes.spaced}
          variant="contained"
          onClick={() => addTouchPoint(studentId)}
        >
          Add
        </Button>
      </Paper>
    </>
  )
}

export default TouchPointQuickAdd
