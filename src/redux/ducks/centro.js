const cambiarK = 'centro/cambiarK'
const cambiarC0 = 'centro/cambiarC0'
const bloquear = 'centro/bloquear'

const defaultState = {
  k: -0.0038781319,
  c0: 3800,
  fueCambiado: false
}

export default function reducer(state = defaultState, action) {
  switch (action.type) {
    case cambiarK: {
      console.log(action.payload)
      return {
        ...state,
        k: action.payload,
      }
    }
    case cambiarC0: {
      return {
        ...state,
        c0: action.payload
      }
    }
    case bloquear: {
      return {
        ...state,
        fueCambiado: true
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

export const bloqueaValores = () => ({
  type: bloquear
})