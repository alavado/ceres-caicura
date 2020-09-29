import React, { useState } from 'react'
import DatePicker from 'react-datepicker'
import { useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'
import TablaPorcentajes from './TablaPorcentajes'
import GraficoBiomasa from './GraficoBiomasa'
import './Biomasa.css'
import 'react-datepicker/dist/react-datepicker.css'

const Biomasa = () => {

  const { nombreArchivo } = useSelector(state => state.datos)
  const [inicioFaena, setInicioFaena] = useState(new Date())

  // if (!nombreArchivo) {
  //   return <Redirect to="/" />
  // }

  return (
    <div className="Biomasa">
      <h1 className="Biomasa__titulo">Composición biomasa</h1>
      <label>
        Inicio faena: 
        <DatePicker
          selected={inicioFaena}
          onChange={fecha => setInicioFaena(fecha)}
        />
      </label>
      <TablaPorcentajes />
      <GraficoBiomasa />
    </div>
  )
}

export default Biomasa
