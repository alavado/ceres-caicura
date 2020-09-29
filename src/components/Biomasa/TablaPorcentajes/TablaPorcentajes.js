import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { fechaInicial } from '../../../helpers/fechas'
import './TablaPorcentajes.css'

const estados = [
  'Peces enteros',
  'Mix sólido pasta',
  'Tipo pasta',
  'Huesos y escamas'
]

const TablaPorcentajes = () => {

  const [dias, setDias] = useState([
    0, 30, 60, 90
  ])
  const { fechaInicioFaena } = useSelector(state => state.biomasa)
  const diasDesdeHundimiento = dias.map(dia => fechaInicioFaena.diff(fechaInicial, 'days') + dia)

  return (
    <div className="TablaPorcentajes">
      <h1 className="TablaPorcentajes__titulo">Resultados</h1>
      <div className="TablaPorcentajes__tabla">
        <div className="TablaPorcentajes__fila">
          <div>Día desde hundimiento</div>
          {diasDesdeHundimiento.map(dia => (
            <div key={`dia-${dia}`}>{dia}</div>
          ))}
        </div>
        <div className="TablaPorcentajes__fila">
          <div>Día faena</div>
          {dias.map(dia => (
            <div key={`dia-${dia}`}>{dia}</div>
          ))}
        </div>
        <div className="TablaPorcentajes__fila">
          <div>Fecha</div>
          {dias.map(dia => (
            <div key={`fecha-${dia}`}>{fechaInicioFaena.clone().add(dia, 'days').format('DD/MM')}</div>
          ))}
        </div>
        {estados.map(estado => (
          <div key={estado} className="TablaPorcentajes__fila">
            <div>{estado}</div>
            <div>0%</div>
            <div>0%</div>
            <div>0%</div>
            <div>0%</div>
          </div>
        ))}
        <div className="TablaPorcentajes__fila">
          <div>Degradación</div>
          <div>0%</div>
          <div>0%</div>
          <div>0%</div>
          <div>0%</div>
        </div>
      </div>
    </div>
  )
}

export default TablaPorcentajes
