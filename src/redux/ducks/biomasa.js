import moment from 'moment'

const cambiarFechaInicioFaena = 'biomasa/cambiarFechaInicioFaena'
const cambiarPorcentajeCentro = 'biomasa/cambiarPorcentajeCentro'
const cambiarPorcentajePeriferia = 'biomasa/cambiarPorcentajePeriferia'

const defaultState = {
  fechaInicioFaena: moment(),
  porcentajeCentro: 50,
  porcentajePeriferia: 50
}

export default function reducer(state = defaultState, action) {
  switch (action.type) {
    case cambiarFechaInicioFaena: {
      return {
        ...state,
        fechaInicioFaena: action.payload
      }
    }
    case cambiarPorcentajeCentro: {
      return {
        ...state,
        porcentajeCentro: action.payload,
        porcentajePeriferia: 100 - action.payload
      }
    }
    case cambiarPorcentajePeriferia: {
      return {
        ...state,
        porcentajePeriferia: action.payload,
        porcentajeCentro: 100 - action.payload
      }
    }
    default:
      return state
  }
}

export const cambiaFechaInicioFaena = fecha => ({
  type: cambiarFechaInicioFaena,
  payload: moment(fecha)
})

export const cambiaPorcentajeCentro = porcentaje => ({
  type: cambiarPorcentajeCentro,
  payload: Math.max(0, Math.min(100, Number(porcentaje)))
})

export const cambiaPorcentajePeriferia = porcentaje => ({
  type: cambiarPorcentajePeriferia,
  payload: Math.max(0, Math.min(100, Number(porcentaje)))
})