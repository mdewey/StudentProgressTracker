import React from 'react'
import auth from '../Auth'

const UnAuthedLayout = () => {
  return (
    <div>
      <button onClick={auth.login}>Log in</button>
    </div>
  )
}

export default UnAuthedLayout
