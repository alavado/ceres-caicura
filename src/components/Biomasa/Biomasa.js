import React, { useState } from 'react'
import DatePicker, { registerLocale } from 'react-datepicker'
import es from "date-fns/locale/es"
import { useDispatch, useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'
import TablaPorcentajes from './TablaPorcentajes'
// import GraficoBiomasa from './GraficoBiomasa'
import './Biomasa.css'
import 'react-datepicker/dist/react-datepicker.css'
import { cambiaFechaInicioFaena } from '../../redux/ducks/biomasa'

registerLocale('es', es)

const Biomasa = () => {

  const { nombreArchivo } = useSelector(state => state.datos)
  const [inicioFaena, setInicioFaena] = useState(new Date())
  const [diasAparicionPasta, setDiasAparicionPasta] = useState(60)
  const [diasAparicionHuesos, setDiasAparicionHuesos] = useState(90)
  const [tasaCambioEstado, setTasaCambioEstado] = useState(0.1)
  const dispatch = useDispatch()

  if (!nombreArchivo) {
    return <Redirect to="/" />
  }

  return (
    <div className="Biomasa">
      <h1 className="Biomasa__titulo">Composición biomasa</h1>
      <div className="Biomasa__inputs">
        <label>
          <div className="Biomasa__label">Tasa cambio de estado diaria:</div>
          <input value={tasaCambioEstado} step={0.05} onChange={e => setTasaCambioEstado(Number(e.target.value))} type="number" />
        </label>
        <label>
          <div className="Biomasa__label">Día aparición tipo pasta:</div>
          <input value={diasAparicionPasta} onChange={e => setDiasAparicionPasta(Number(e.target.value))} type="number" />
        </label>
        <label>
          <div className="Biomasa__label">Día aparición huesos y escamas:</div>
          <input value={diasAparicionHuesos} onChange={e => setDiasAparicionHuesos(Number(e.target.value))} type="number" />
        </label>
        <label>
          <div className="Biomasa__label">Inicio faena: </div>
          <DatePicker
            selected={inicioFaena}
            onChange={fecha => {
              dispatch(cambiaFechaInicioFaena(fecha))
              setInicioFaena(fecha)
            }}
            locale="es"
          />
        </label>
      </div>
      <div className="Biomasa__contenedor">
        <TablaPorcentajes />
        {/* <GraficoBiomasa /> */}
      </div>
    </div>
  )
}

export default Biomasa
