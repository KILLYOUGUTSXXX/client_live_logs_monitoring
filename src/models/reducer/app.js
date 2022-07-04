// Initial state for models "app"
const initialState = {
  counter: 0,
  processOf: null,
  processDesc: null
}

// Reducers (this section is functionally to update the state)
const appReducer = (state = initialState, { type, payload = {} }) => {
  // find namespace and action by seperate the type.
  const namespace = type.split('/')[0]
  const action = type.split('/')[1]

  // make sure if the namespace is "app" to avoid the bug when returning the state
  if (namespace !== 'app') return state

  // all functions that's allowed to updating the state of models "app"
  const actions = {
    updateState: _ => ({ ...state, ...payload }),
    updateValue: _ => ({ ...state, counter: state.counter + payload.value })
  }[action]

  // returning the state
  return typeof actions === 'function' ? actions() : state
}

export default appReducer
