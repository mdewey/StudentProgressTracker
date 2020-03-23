import React, { Component } from 'react'
import { Route, Switch } from 'react-router'
import { Layout } from './components/Layout'
import Home from './pages/Home'
import HelloWorld from './pages/_template/HelloWorld'
import HeyWorld from './pages/_template/HeyWorld'
import NotFound from './pages/NotFound'
import PullCohorts from './pages/PullCohorts'
import './custom.scss'
import PullStudents from './pages/PullStudents'
import CohortDetails from './pages/CohortDetails'
import StudentDetails from './pages/StudentDetails'
export default class App extends Component {
  static displayName = App.name

  render() {
    return (
      <Layout>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/counter" component={HelloWorld} />
          <Route exact path="/typescript" component={HeyWorld} />
          <Route exact path="/cohort/:cohortId" component={CohortDetails} />
          <Route exact path="/student/:studentId" component={StudentDetails} />
          <Route exact path="/pull/cohorts" component={PullCohorts} />
          <Route exact path="/pull/students" component={PullStudents} />
          <Route exact path="*" component={NotFound} />
        </Switch>
      </Layout>
    )
  }
}
