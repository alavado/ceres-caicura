const login = 'login/login'

export default function reducer(state = {}, action) {
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