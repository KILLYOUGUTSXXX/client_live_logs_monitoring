// Initial state for models "app"
const initialState = {}

// Reducers (this section is functionally to update the state)
const loadingsReducer = (state = initialState, { type, payload = {} }) => {
  // find namespace and action by seperate the type.
  const namespace = type.split('/')[0]
  const action = type.split('/')[1]

  // make sure if the namespace is "app" to avoid the bug when returning the state
  if (namespace !== 'loadings') return state

  // all functions that's allowed to updating the state of models "app"
  const actions = {
    updateState: _ => ({ ...state, ...payload })
  }[action]

  // returning the state
  return typeof actions === 'function' ? actions() : state
}

export default loadingsReducer
