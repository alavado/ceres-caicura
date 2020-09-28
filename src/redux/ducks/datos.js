const guardarDatos = 'datos/guardarDatos'

const defaultState = {
  datos: []
}

export default function reducer(state = defaultState, action) {
  switch (action.type) {
    case guardarDatos: {
      const { datos, nombreArchivo } = action.payload
      console.log(datos)
      return {
        ...state,
        datos: Array.isArray(datos[0])
          ? datos.map(([id, fecha, peso, largo]) => ({
            id,
            fecha,
            peso: Number(peso),
            largo: Number(largo),
          }))
          : datos,
        nombreArchivo: nombreArchivo ?? state.nombreArchivo
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