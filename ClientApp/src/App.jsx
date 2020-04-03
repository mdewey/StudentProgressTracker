import React, { Component } from 'react'
import { Route, Switch } from 'react-router'
import { Layout } from './components/Layout'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import PullCohorts from './pages/PullCohorts'
import './custom.scss'
import PullStudents from './pages/PullStudents'
import CohortDetails from './pages/CohortDetails'
import StudentDetails from './pages/StudentDetails'
import Empty from './pages/Empty'
import UnAuthedLayout from './pages/UnAuthedLayout'
import auth from './Auth'

const CallBackRoute = () => (
  <Route
    exact
    path="/callback/:jwt"
    render={props => {
      auth.handleAuthentication(props.match.params.jwt)
      return <Empty />
    }}
  />
)

export default class App extends Component {
  static displayName = App.name

  render() {
    if (!auth.isAuthenticated) {
      return (
        <Switch>
          <Route exact path="/" component={UnAuthedLayout} />
          <CallBackRoute />
        </Switch>
      )
    }
    return (
      <Layout>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/cohort/:cohortId" component={CohortDetails} />
          <Route exact path="/student/:studentId" component={StudentDetails} />
          <Route exact path="/pull/cohorts" component={PullCohorts} />
          <Route exact path="/pull/students" component={PullStudents} />
          {/* auth stuff */}
          <CallBackRoute />

          <Route
            exact
            path="/login"
            render={() => {
              auth.login()
              return <Empty />
            }}
          />
          <Route exact path="*" component={NotFound} />
        </Switch>
      </Layout>
    )
  }
}
