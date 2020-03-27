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

  const update1on1 = async e => {
    e.persist()
    setReport(prev => ({ ...prev, has1On1: e.target.checked }))
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
      <section>{isChangePending ? 'not saved' : 'saved'}</section>
      <section className="reports">
        {/* has1On1: false */}
        <section>
          halfway 1 on 1 :{' '}
          <input
            type="checkbox"
            value={report.has1On1}
            checked={report.has1On1 ?? 'checked'}
            onChange={e => update1on1(e)}
          />
        </section>
        <section>
          <header>Capstone</header>
          {/* capstoneHasBeenApproved: false */}
          <section>
            is Approved:{' '}
            <input type="checkbox" value={report.capstoneHasBeenApproved} />
          </section>
          <section>
            {/* capstoneIdea: null */}
            Idea:
            <input type="text" value={report.capstoneIdea} />
          </section>
          <section>
            {/* turnedInWireFrames: false */}
            turned In Wire Frames
            <input type="checkbox" value={report.turnedInWireFrames} />
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
