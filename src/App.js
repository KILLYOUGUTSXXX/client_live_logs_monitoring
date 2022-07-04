import React, { useState, cloneElement } from 'react'
import {
  unstable_HistoryRouter as Router,
  useRoutes,
  Route,
  Routes
} from 'react-router-dom'
import { createBrowserHistory } from 'history'
import { grommet, Box, Grid, Grommet, Button, Menu } from "grommet"
import { PersistGate } from 'redux-persist/integration/react'
import { Provider } from 'react-redux'
import { store, persistor } from './models/config/store'
import ViewRoutes from './routes'
import createActions from './models/action'
import { connect } from 'react-redux'
import './App.css'

const history = createBrowserHistory({ window })

function connectModels (models = function () {}, component, props = {}) {
  const Components = connect(
    models,
    (dispatch) => ({ calls: createActions(dispatch).call })
  )(component)

  return cloneElement(<Components />, { ...props })
}

// function to build nested route
function treeRoutes (items = {}, extProps = {}) {
  let ChildRoutes = []

  // check if the record is include a children items
  if(!!items.children && Array.isArray(items.children) && items.children.length > 0) {
    ChildRoutes = items.children.map(x => treeRoutes(x, extProps)) // recursive the children using loops
  }
  return (
    <Route
      key={items.key}
      path={items.path}
      // cloning the props from parent to be cuonsumeable by child components
      element={cloneElement(items.element, { ...extProps, connectModels, childs: <Routes>{ChildRoutes}</Routes> })}
    >
      {ChildRoutes}
    </Route>
  )
}


// function to create an a route by list routers
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

// Declare routers
const listRoutes = [
  {
    path: '/',      
    element: <ViewRoutes.Main />,
    key: 'A01',
    children: [
      { key: 'A01-A01', path: 'testing', element: <ViewRoutes.Testing /> },
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
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Router history={history}>
          <Routes>
            {registerRouters({ routers: listRoutes, extProps: newProps })}
          </Routes>
        </Router>
      </PersistGate>
    </Provider>
  )
}




export default App
