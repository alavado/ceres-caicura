const cambiarK = 'centro/cambiarK'
const cambiarC0 = 'centro/cambiarC0'

const defaultState = {
  k: -0.0000000448,
  c0: 3800
}

export default function reducer(state = defaultState, action) {
  switch (action.type) {
    case cambiarK: {
      return {
        ...state,
        k: action.payload
      }
    }
    case cambiarC0: {
      return {
        ...state,
        c0: action.payload
      }
    }
    default:
      return state
  }
}

export const cambiaK = k => {
  return {
    type: cambiarK,
    payload: k
  }
}

export const cambiaC0 = c0 => {
  return {
    type: cambiarC0,
    payload: c0
  }
}