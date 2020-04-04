import React from 'react'
import auth from '../Auth'

// const AuthenticatedPage = props => {
//   const { Page } = props
//   console.log('here', Page)
//   if (auth.isAuthenticated()) {
//     return <Page />
//   } else {
//     window.location = '/'
//   }
// }

const withAuth = Wrapped => {
  return () => {
    // Wraps the input component in a container, without mutating it. Good!
    if (auth.isAuthenticated) {
      return <Wrapped />
    } else {
      window.location = '/'
      return <p></p>
    }
  }
}
export default withAuth
