import React, { useState } from 'react'
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

  return (
    <div className="TablaPorcentajes">
      <h1>Resultados</h1>
      <div className="TablaPorcentajes__fila">
        <div />
        {dias.map(dia => (
          <div key={dia}>Día {dia}</div>
        ))}
      </div>
      <div className="TablaPorcentajes__fila">
        <div />
        {dias.map(dia => (
          <div key={dia}>Día {dia}</div>
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
  )
}

export default TablaPorcentajes
