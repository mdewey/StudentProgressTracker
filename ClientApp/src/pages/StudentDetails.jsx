import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Chip from '@material-ui/core/Chip'
import FormGroup from '@material-ui/core/FormGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import TextareaAutosize from '@material-ui/core/TextareaAutosize'
import LinearProgress from '@material-ui/core/LinearProgress'

import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'

import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'

import Button from '@material-ui/core/Button'
import auth from '../Auth'

const useStyles = makeStyles(theme => ({
  section: {
    padding: theme.spacing(3),
    marginBottom: theme.spacing(1),
    width: '100%',
  },
  textArea: {
    width: '100%',
  },
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
  container: {
    height: '100vh',
    width: '100wh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}))

const StudentDetails = props => {
  const classes = useStyles()
  const [newTouchPoint, setNewTouchPoint] = useState('')
  const [student, setStudent] = useState({})
  const [report, setReport] = useState({})
  const [isChangePending, setIsChangePending] = useState(false)
  const [touchPoints, setTouchPoints] = useState([])
  const [notFound, setNotFound] = useState(false)
  const { studentId } = props.match.params

  const getStudentData = async () => {
    try {
      const resp = await axios.get(
        `/api/student/${studentId}/data`,
        auth.getHeader()
      )
      console.log(resp.status)

      console.log(resp.data)
      setStudent({ ...resp.data.student, studentProgresses: null })
      setReport(resp.data.student.studentProgresses[0])
      setTouchPoints(resp.data.touchPoints)
    } catch (error) {
      setNotFound(true)
    }
  }

  useEffect(() => {
    getStudentData()
  }, [])

  const updateCheckBox = (e, key) => {
    e.persist()
    setReport(prev => ({ ...prev, [key]: e.target.checked }))
    setIsChangePending(true)
  }
  const slideChange = (e, key) => {
    const { value } = e.target
    setReport(prev => ({ ...prev, [key]: parseInt(value) }))
    setIsChangePending(true)
  }

  const saveProgressToServer = async (report, isChangePending) => {
    //put to server
    if (report.id && isChangePending) {
      console.log('updating')
      const resp = await axios.put(
        `/api/progress/${report.id}`,
        report,
        auth.getHeader()
      )
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

  const addTouchPoint = async e => {
    e.preventDefault()
    if (newTouchPoint) {
      setIsChangePending(true)

      const resp = await axios.post(
        `/api/student/${student.id}/touchpoint`,
        {
          description: newTouchPoint,
        },
        auth.getHeader()
      )
      if (resp.status === 200) {
        setIsChangePending(false)
        setTouchPoints([resp.data, ...touchPoints])
        setNewTouchPoint('')
      }
    }
  }

  const deleteStudent = async () => {
    const resp = await axios.delete(
      `/api/student/${student.id}`,
      auth.getHeader()
    )
    if (resp.status === 200) {
      setNotFound(true)
    }
  }

  useEffect(() => {
    saveProgressToServer(report, isChangePending)
  }, [report, isChangePending])

  if (notFound) {
    return (
      <div className={classes.container}>
        <Card className={classes.root}>
          <CardActionArea>
            <CardMedia
              className={classes.media}
              image="https://placekitten.com/345/140"
              title="Contemplative Kitty"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                No Student here
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Link
              to={
                report.cohortId ? `/cohort/${report.cohortId}/dashboard` : '/'
              }
            >
              Back To Cohort
            </Link>
          </CardActions>
        </Card>
      </div>
    )
  }

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
              label="back to cohort"
              component="a"
              href={
                report.cohortId ? `/cohort/${report.cohortId}/dashboard` : '/'
              }
              clickable
            />
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
            {/* TODO: cohortId: 1 */}
          </nav>
        </section>
        <Grid container spacing={3}>
          <Grid item sm={6}>
            <Paper elevation={3} className={classes.section}>
              <FormGroup row>
                <FormControlLabel
                  control={
                    <Checkbox
                      name="checkedA"
                      value={report.has1On1}
                      checked={report.has1On1 ?? 'checked'}
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
                        checked={report.capstoneHasBeenApproved ?? 'checked'}
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
                  value={report.capstoneIdea}
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
                        checked={report.turnedInWireFrames ?? 'checked'}
                        onChange={e => updateCheckBox(e, 'turnedInWireFrames')}
                      />
                    }
                    label="turned In Wire Frames"
                  />
                </FormGroup>
              </section>
            </Paper>
            <Paper elevation={3} className={classes.section}>
              {/* concernedLevel: 0 */}
              <h5>Concerned Level: {report.concernedLevel}/10</h5>

              <input
                type="range"
                name=""
                id=""
                value={report.concernedLevel}
                onChange={e => slideChange(e, 'concernedLevel')}
                min={0}
                max={10}
              />
            </Paper>
          </Grid>
          <Grid item sm={6}>
            <Paper className={classes.section}>
              {/* capstoneIdea: null */}

              <h5>Touch points</h5>

              <TextareaAutosize
                aria-label="capstone label"
                rowsMin={3}
                className={classes.textArea}
                placeholder="Add a new touch point"
                value={newTouchPoint}
                onChange={e => setNewTouchPoint(e.target.value)}
              />
              <Button variant="contained" onClick={addTouchPoint}>
                Add
              </Button>

              <Divider component="div" />

              <List className={classes.root}>
                {touchPoints.map(point => {
                  return (
                    <>
                      <ListItem alignItems="flex-start">
                        <ListItemText
                          primary={point.description}
                          secondary={
                            <>
                              <Typography
                                component="span"
                                variant="body2"
                                color="textPrimary"
                              >
                                {point.timestamp}
                              </Typography>
                            </>
                          }
                        />
                      </ListItem>
                      <Divider component="li" />
                    </>
                  )
                })}
              </List>
            </Paper>
          </Grid>
        </Grid>
        <Paper elevation={3} className={classes.section}>
          <h5>Danger Zone</h5>

          <Button
            variant="contained"
            color="secondary"
            className={classes.button}
            onClick={deleteStudent}
          >
            Delete (dropped)
          </Button>
        </Paper>
      </div>
    </>
  )
}

export default StudentDetails
