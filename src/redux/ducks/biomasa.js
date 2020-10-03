import moment from 'moment'

const cambiarFechaInicioFaena = 'biomasa/cambiarFechaInicioFaena'
const cambiarPorcentajeCentro = 'biomasa/cambiarPorcentajeCentro'
const cambiarPorcentajePeriferia = 'biomasa/cambiarPorcentajePeriferia'
const cambiarDiasAparicionPasta = 'biomasa/cambiarDiasAparicionPasta'
const cambiarDiasAparicionHuesos = 'biomasa/cambiarDiasAparicionHuesos'
const cambiarTasaCambioEstado = 'biomasa/cambiarTasaCambioEstado'

const defaultState = {
  fechaInicioFaena: moment(),
  porcentajeCentro: 50,
  porcentajePeriferia: 50,
  tasaCambioEstado: 0.1,
  diasAparicionPasta: 60,
  diasAparicionHuesos: 90
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
    case cambiarDiasAparicionPasta: {
      return {
        ...state,
        diasAparicionPasta: action.payload
      }
    }
    case cambiarDiasAparicionHuesos: {
      return {
        ...state,
        diasAparicionHuesos: action.payload,
        diasAparicionPasta: Math.min(state.diasAparicionPasta, action.payload)
      }
    }
    case cambiarTasaCambioEstado: {
      return {
        ...state,
        tasaCambioEstado: action.payload
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

export const cambiaDiasAparicionPasta = dias => ({
  type: cambiarDiasAparicionPasta,
  payload: Number(dias)
})

export const cambiaDiasAparicionHuesos = dias => ({
  type: cambiarDiasAparicionHuesos,
  payload: Number(dias)
})

export const cambiaTasaCambioEstado = tasa => ({
  type: cambiarTasaCambioEstado,
  payload: Number(tasa)
})