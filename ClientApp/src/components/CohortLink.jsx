import React from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'

const CohortLink = ({ cohort }) => {
  return (
    <li>
      <Link to={`/cohort/${cohort.id}`}>
        <div>{cohort.name}</div>
      </Link>
    </li>
  )
}

export default CohortLink
