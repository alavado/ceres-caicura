import { generarFechasMoment } from '../../helpers/fechas'
import moment from 'moment'

const guardarDatos = 'datos/guardarDatos'

const defaultState = {
  datos: [],
  fechas: generarFechasMoment()
}

export default function reducer(state = defaultState, action) {
  switch (action.type) {
    case guardarDatos: {
      const { datos, nombreArchivo } = action.payload
      return {
        ...state,
        datos: Array.isArray(datos[0])
          ? datos.map(([id, fecha, peso, largo]) => ({
            id,
            fecha: moment(fecha, 'DD-MM-YYYY'),
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