import React, { useEffect, useState } from 'react'
import axios from 'axios'

import Paper from '@material-ui/core/Paper'
import Chip from '@material-ui/core/Chip'
import FormGroup from '@material-ui/core/FormGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import TextareaAutosize from '@material-ui/core/TextareaAutosize'
import { makeStyles } from '@material-ui/core/styles'
import LinearProgress from '@material-ui/core/LinearProgress'
import Slider from '@material-ui/core/Slider'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles(theme => ({
  section: {
    padding: theme.spacing(3),
    marginBottom: theme.spacing(1),
  },
}))

const StudentDetails = props => {
  const classes = useStyles()

  const [student, setStudent] = useState({})
  const [report, setReport] = useState({})
  const [isChangePending, setIsChangePending] = useState(false)
  const { studentId } = props.match.params

  const getStudentData = async () => {
    const resp = await axios.get(`/api/student/${studentId}/data`)
    console.log(resp.data)
    setStudent({ ...resp.data, studentProgresses: null })
    setReport(resp.data.studentProgresses[0])
  }

  useEffect(() => {
    getStudentData()
  }, [])

  const updateCheckBox = (e, key) => {
    e.persist()
    setReport(prev => ({ ...prev, [key]: e.target.checked }))
    setIsChangePending(true)
  }
  const slideChange = (value, key) => {
    setReport(prev => ({ ...prev, [key]: parseInt(value) }))
    setIsChangePending(true)
  }

  const saveProgressToServer = async (report, isChangePending) => {
    //put to server
    if (report.id && isChangePending) {
      console.log('updating')
      const resp = await axios.put(`/api/progress/${report.id}`, report)
      if (resp.status === 204) {
        setIsChangePending(false)
      }
    }
  }

  const updateTextArea = (e, key) => {
    e.persist()
    setReport(prev => ({ ...prev, [key]: e.target.value }))
  }

  const textBoxBlur = (e, key) => {
    e.persist()
    setReport(prev => ({ ...prev, [key]: e.target.value }))
    setIsChangePending(true)
  }

  useEffect(() => {
    saveProgressToServer(report, isChangePending)
  }, [report, isChangePending])

  return (
    <>
      <section>
        {!isChangePending || <LinearProgress color="secondary" />}
      </section>
      <div>
        <br />
        <section>
          <h1>{student.fullName}</h1>
          <nav className="student-nav">
            <Chip
              label={student.gitHub}
              component="a"
              href={`https://www.github.com/${student.gitHub}`}
              clickable
            />
            <Chip
              label={'nexus'}
              component="a"
              href={`https://nexus.suncoast.io/people/${student.pylonId}/gradebook`}
              clickable
            />
          </nav>
        </section>

        <section className="reports">
          {/* has1On1: false */}
          <Paper elevation={3} className={classes.section}>
            <FormGroup row>
              <FormControlLabel
                control={
                  <Checkbox
                    name="checkedA"
                    value={report.has1On1}
                    checked={report.has1On1 ?? true}
                    onChange={e => updateCheckBox(e, 'has1On1')}
                  />
                }
                label="halfway 1 on 1"
              />
            </FormGroup>
          </Paper>
          <Paper elevation={3} className={classes.section}>
            <header>Capstone</header>
            {/* capstoneHasBeenApproved: false */}
            <section>
              <FormGroup row>
                <FormControlLabel
                  control={
                    <Checkbox
                      value={report.capstoneHasBeenApproved}
                      checked={report.capstoneHasBeenApproved ?? true}
                      onChange={e =>
                        updateCheckBox(e, 'capstoneHasBeenApproved')
                      }
                    />
                  }
                  label="is Approved"
                />
              </FormGroup>
            </section>
            <section>
              {/* capstoneIdea: null */}

              <h5>Idea</h5>

              <TextareaAutosize
                aria-label="capstone label"
                rowsMin={3}
                placeholder="No idea yet...."
                value={report.capstoneIdea || ''}
                onChange={e => updateTextArea(e, 'capstoneIdea')}
                onBlur={e => textBoxBlur(e, 'capstoneIdea')}
              />
            </section>
            <section>
              <FormGroup row>
                <FormControlLabel
                  control={
                    <Checkbox
                      value={report.turnedInWireFrames}
                      checked={report.turnedInWireFrames ?? true}
                      onChange={e => updateCheckBox(e, 'turnedInWireFrames')}
                    />
                  }
                  label="turned In Wire Frames"
                />
              </FormGroup>
            </section>
          </Paper>
          <Paper elevation={3} className={classes.section}>
            <Typography id="concerned-slider" gutterBottom>
              Concerned Level: {report.concernedLevel}/10
            </Typography>
            <Slider
              aria-labelledby="concerned-slider"
              value={report.concernedLevel}
              onChangeCommitted={(e, value) =>
                slideChange(value, 'concernedLevel')
              }
              step={1}
              min={0}
              marks
              max={10}
            />
          </Paper>
          {/* TODO: cohortId: 1 */}
        </section>
      </div>
    </>
  )
}

export default StudentDetails
