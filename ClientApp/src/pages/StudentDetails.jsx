import React, { useEffect, useState } from 'react'
import axios from 'axios'

const StudentDetails = props => {
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
    <div>
      <section>
        <h1>{student.fullName}</h1>
        <section>
          <p>github: {student.gitHub}</p>
          <p>{student.pylonId}</p>
        </section>
      </section>
      <section>{isChangePending ? 'changes pending' : 'up to date'}</section>
      <section className="reports">
        {/* has1On1: false */}
        <section>
          halfway 1 on 1 :{' '}
          <input
            type="checkbox"
            value={report.has1On1}
            checked={report.has1On1 ?? 'checked'}
            onChange={e => updateCheckBox(e, 'has1On1')}
          />
        </section>
        <section>
          <header>Capstone</header>
          {/* capstoneHasBeenApproved: false */}
          <section>
            is Approved:{' '}
            <input
              type="checkbox"
              value={report.capstoneHasBeenApproved}
              checked={report.capstoneHasBeenApproved ?? 'checked'}
              onChange={e => updateCheckBox(e, 'capstoneHasBeenApproved')}
            />
          </section>
          <section>
            {/* capstoneIdea: null */}
            Idea:
            <textarea
              value={report.capstoneIdea}
              onChange={e => updateTextArea(e, 'capstoneIdea')}
              onBlur={e => textBoxBlur(e, 'capstoneIdea')}
            />
          </section>
          <section>
            {/* turnedInWireFrames: false */}
            turned In Wire Frames
            <input
              type="checkbox"
              value={report.turnedInWireFrames}
              checked={report.turnedInWireFrames ?? 'checked'}
              onChange={e => updateCheckBox(e, 'turnedInWireFrames')}
            />
          </section>
        </section>
        <section>
          {/* concernedLevel: 0 */}
          <header>Concerned Level</header>
          <input
            type="range"
            name=""
            id=""
            value={report.concernedLevel}
            min={0}
            max={10}
          />
        </section>
        {/* TODO: cohortId: 1 */}
      </section>
    </div>
  )
}

export default StudentDetails
