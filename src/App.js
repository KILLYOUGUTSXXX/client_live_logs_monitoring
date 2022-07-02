import React, { useState, cloneElement } from 'react'
import {
  unstable_HistoryRouter as Router,
  useRoutes,
  Route,
  Routes
} from 'react-router-dom'
import { createBrowserHistory } from 'history'
import { grommet, Box, Grid, Grommet, Button, Menu } from "grommet"
import MainRoutes from './routes/main'
import './App.css'

const history = createBrowserHistory({ window })


function treeRoutes (items = {}, extProps = {}) {
  let ChildRoutes = []
  if(!!items.children && Array.isArray(items.children) && items.children.length > 0) {
    ChildRoutes = items.children.map(x => treeRoutes(x, extProps))
  }
  return (
    <Route
      key={items.key}
      path={items.path}
      element={cloneElement(items.element, { ...extProps, childs: <Routes>{ChildRoutes}</Routes> })}
    >
      {ChildRoutes}
    </Route>
  )
}

function registerRouters ({
  routers = [{
    path: '', children: [], menuName: '', element: <div />
  }],
  extProps = {}
}) {
  const myRoutes = routers.map(items => {
    return treeRoutes(items, extProps)
  })
  return myRoutes
}

function DashboardView ({ childs }) {
  return (
    <Box>
      <Box>Dashboard {childs}</Box>
    </Box>
  )
}


const listRoutes = [
  {
    path: '/',      
    element: <MainRoutes />,
    key: 'A01',
    children: [
      { key: 'A01-A01', path: 'testing', element: <Box>Testing</Box> },
      { key: 'A01-A02', path: 'monitor', element: <Box>Monitoring</Box> },
      { key: 'A01-A03', path: 'coffee', element: <Box>Coffee</Box> }
    ]
  }
]

function App({ ...props }) {
  const [currentPath, updatePath] = useState(window.location.pathname)

  const newProps = {
    currentPath,
    moveTo: (paths) => {
      updatePath(paths)
      history.replace(paths)
    }
  }

  // MainApps
  return (
    <Router history={history}>
      <Routes>
        {registerRouters({ routers: listRoutes, extProps: newProps })}
      </Routes>
    </Router>
  )
}




export default App
