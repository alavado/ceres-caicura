const login = 'login/login'

const defaultState = {
  usuario: window.location.href.indexOf('localhost') >= 0
}

export default function reducer(state = defaultState, action) {
  switch (action.type) {
    case login: {
      return {
        ...state,
        usuario: action.payload
      }
    }
    default:
      return state
  }
}

export const iniciaSesion = password => {
  return {
    type: login,
    payload: password === 'caicura276'
  }
}