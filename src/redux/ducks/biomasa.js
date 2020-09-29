import moment from 'moment'

const cambiarFechaInicioFaena = 'biomasa/cambiarFechaInicioFaena'

const defaultState = {
  fechaInicioFaena: moment()
}

export default function reducer(state = defaultState, action) {
  switch (action.type) {
    case cambiarFechaInicioFaena: {
      return {
        ...state,
        fechaInicioFaena: action.payload
      }
    }
    default:
      return state
  }
}

export const cambiaFechaInicioFaena = fecha => {
  return {
    type: cambiarFechaInicioFaena,
    payload: moment(fecha)
  }
}