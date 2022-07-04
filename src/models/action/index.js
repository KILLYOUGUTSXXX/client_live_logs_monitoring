import Main from './main'

const listActions = {
  ...Main
}


export default function createActions (dispatch) {
  return {
    call: async ({type, payload = {}}) => {
      const namespace = type.split('/')[0]
      const action = type.split('/')[1]
      dispatch({ type: 'loadings/updateState', payload: { [type]: true } })
      const res = await listActions[namespace][action](payload, dispatch)
      dispatch({ type: 'loadings/updateState', payload: { [type]: false } })
      return res
    }
  }
}
