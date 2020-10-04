import React, { useState } from 'react'
import DatePicker, { registerLocale } from 'react-datepicker'
import es from "date-fns/locale/es"
import { useDispatch, useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'
import TablaPorcentajes from './TablaPorcentajes'
// import GraficoBiomasa from './GraficoBiomasa'
import './Biomasa.css'
import 'react-datepicker/dist/react-datepicker.css'
import { cambiaDiasAparicionHuesos, cambiaDiasAparicionPasta, cambiaFechaInicioFaena, cambiaPorcentajeCentro, cambiaPorcentajePeriferia, cambiaTasaCambioEstado } from '../../redux/ducks/biomasa'

registerLocale('es', es)

const Biomasa = () => {

  const { nombreArchivo } = useSelector(state => state.datos)
  const [inicioFaena, setInicioFaena] = useState(new Date())
  const { porcentajeCentro, porcentajePeriferia, diasAparicionHuesos, diasAparicionPasta, tasaCambioEstado } = useSelector(state => state.biomasa)
  const dispatch = useDispatch()

  if (!nombreArchivo) {
    return <Redirect to="/" />
  }

  return (
    <div className="Biomasa">
      <div className="Biomasa__parametros">
        <h1 className="Biomasa__titulo">Distribución modelos</h1>
        <div className="Biomasa__contenedor_porcentajes">
          <label className="Biomasa__parametro">
            <div className="Biomasa__label">Periferia:</div>
            <input
              type="number"
              max={100}
              min={0}
              step={1}
              value={porcentajePeriferia}
              onChange={e => dispatch(cambiaPorcentajePeriferia(e.target.value))}
            />%
          </label>
          <label className="Biomasa__parametro">
            <div className="Biomasa__label">Centro:</div>
            <input
              type="number"
              max={100}
              min={0}
              step={1}
              value={porcentajeCentro}
              onChange={e => dispatch(cambiaPorcentajeCentro(e.target.value))}
            />%
          </label>
        </div>
        <h1 className="Biomasa__titulo">Estados de descomposición</h1>
        <div className="Biomasa__inputs">
          <label className="Biomasa__parametro_descomposicion">
            <div className="Biomasa__label">Tasa cambio de estado diaria:</div>
            <input
              value={tasaCambioEstado}
              step={0.01}
              min={0}
              onChange={e => dispatch(cambiaTasaCambioEstado(e.target.value))}
              type="number"
            />
          </label>
          <label className="Biomasa__parametro_descomposicion">
            <div className="Biomasa__label">Día aparición tipo pasta:</div>
            <input
              value={diasAparicionPasta}
              min={0}
              onChange={e => dispatch(cambiaDiasAparicionPasta(e.target.value))}
              type="number"
            />
          </label>
          <label className="Biomasa__parametro_descomposicion">
            <div className="Biomasa__label">Día aparición huesos y escamas:</div>
            <input
              value={diasAparicionHuesos}
              min={0}
              onChange={e => dispatch(cambiaDiasAparicionHuesos(e.target.value))}
              type="number"
            />
          </label>
          <label className="Biomasa__parametro_descomposicion">
            <div className="Biomasa__label">Inicio faena: </div>
            <DatePicker
              selected={inicioFaena}
              onChange={fecha => {
                dispatch(cambiaFechaInicioFaena(fecha))
                setInicioFaena(fecha)
              }}
              dateFormat="dd/MM/yyyy"
              locale="es"
            />
          </label>
        </div>
      </div>
      <div className="Biomasa__contenedor">
        <TablaPorcentajes />
        {/* <GraficoBiomasa /> */}
      </div>
    </div>
  )
}

export default Biomasa
