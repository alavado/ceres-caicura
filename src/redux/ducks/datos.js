const guardarDatos = 'datos/guardarDatos'

const defaultState = {
  datos: []
}

export default function reducer(state = defaultState, action) {
  switch (action.type) {
    case guardarDatos: {
      const { datos, nombreArchivo } = action.payload
      return {
        ...state,
        datos,
        nombreArchivo
      }
    }
    default:
      return state
  }
}

export const guardaEstosDatos = (datos, nombreArchivo) => {
  return {
    type: guardarDatos,
    payload: {
      datos,
      nombreArchivo
    }
  }
}