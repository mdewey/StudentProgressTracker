import React, { Component } from 'react'
import {
  Collapse,
  Container,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  NavItem,
  NavLink,
} from 'reactstrap'
import './style.scss'

import { Link as RouterLink } from 'react-router-dom'

import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import Link from '@material-ui/core/Link'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}))

export function NavMenu() {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Distance Rodeo
          </Typography>
          <Link component={RouterLink} to="/" className="text-light nav-link ">
            Home
          </Link>
          <Link
            component={RouterLink}
            to="/pull/cohorts"
            className="text-light nav-link"
          >
            Pull Cohorts
          </Link>
          <Link
            component={RouterLink}
            className="text-light nav-link"
            to="/pull/students"
          >
            Pull Students
          </Link>
        </Toolbar>
      </AppBar>
    </div>
  )
}
