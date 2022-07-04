import React, { Component, useContext } from 'react'
import { Box, Grid, Card, CardBody, CardFooter, CardHeader, ResponsiveContext } from 'grommet'
import './global-style.css'
import { Button } from '../components'


const cardGridSize = {
  small: '100%',
  medium: '40%',
  large: '20%'
}

function Testing ({ calls, ...props }) {
  const { counter, processDesc } = props.app
  const loadingData = (props.loadings['app/processData'] || false)

  const size = useContext(ResponsiveContext)
  const generateCard = (data, index) => {
    return (
      <Card pad="large" key={index} className="pack-card">
        <Box>Process {index + 1}</Box>
        <Box>
          <Button
            loading={loadingData}
            type="warning"
            size="default"
            onClick={x => {
              calls({ type: 'app/processData', payload: { processOf: `P${index + 1}`, processDesc: `Process ${index + 1}` } })
            }}
          >Test Me</Button>
        </Box>
      </Card>
    )
  }


  return (
    <Box pad="large">
      <Grid columns={cardGridSize[size]} gap="large">
        {new Array(10).fill('-').map((x, y) => generateCard(x, y))}
      </Grid>
    </Box>
  )
  
}

export default ({ connectModels }) => connectModels(({ app, loadings }) => ({ app, loadings }), Testing)