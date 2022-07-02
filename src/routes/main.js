import React, { useState } from 'react'
import { createBrowserHistory } from 'history'
import { grommet, Box, Grid, Grommet, Button, Menu } from "grommet"
import Icons from '../components/Icon'

const history = createBrowserHistory({ window })


const menus = [
  { keys: 'task', title: 'Testing', icons: 'Task', paths: '/testing' },
  { keys: 'monologs', title: 'Monitoring Logs', icons: 'View', paths: '/monitor' },
  { keys: 'coffee', title: 'Coffee', icons: 'Coffee', paths: '/coffee' }
]

function MainApps ({
  moveTo, currentPath, childs, ...props
}) {
  const [collapsed, onCollapse] = useState(false)

  const MenuItems = ({
    icons, title, paths, keys
  }) => (
    <Button
      key={keys}
      className={`btn-menu ${currentPath === paths ? 'selected' : ''}`}
      onClick={_ => moveTo(paths)}
    >
      <Box direction="row" justify="start" className={`appsBox ${collapsed ? 'min' : 'max'}`}>
        <Icons
          type={icons}
          size={collapsed ? '34px' : '22px'}
          className={`iconCollapsed ${collapsed ? 'min' : 'max'}`}
        />
        <span className={`collapsedText ${collapsed ? 'min' : 'max'}`}>{title}</span>
      </Box>
    </Button>
  )
  return (
    <Grommet theme={grommet} full>
      <Grid fill rows={["auto", "flex", "auto"]}>
        <Box tag="header" className="header" pad="small">
          <Icons type='Menu' color="white" size="medium" onClick={_ => onCollapse(!collapsed)} cursor="pointer" />
        </Box>
        <Box direction="row" justify="start">
          <Box
            className={`sidebar ${collapsed ? 'min' : 'max'}`}
            background="light-2"
            overflow="hidden"
          >
            <Box className="sidebar-content">
              {
                menus.map((items, y) => <MenuItems key={y} {...items} />)
              }
            </Box>
          </Box>
          <Box overflow="auto" width="xxlarge" className="content">
            { childs }
          </Box>
        </Box>
        <Box tag="footer" pad="small" background="dark-1">
          footer
        </Box>
      </Grid>
    </Grommet>
  )
}



export default MainApps
