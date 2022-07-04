import React from 'react'

export default ({
  processData: ({ processOf, processDesc }, dispatch) => {
    return new Promise(resolve => {
      dispatch({ type: 'app/updateState', payload: { processOf, processDesc } })
      setTimeout(() => {
        resolve()
      }, 2000)
    })
  },
  increment: (_, dispatch) => {
    dispatch({ type: 'app/updateValue', payload: { value: 1 } })
  },
  decreament: (_, dispatch) => {
    dispatch({ type: 'app/updateValue', payload: { value: -1 } })
  }
})
