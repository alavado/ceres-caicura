import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { fechaInicial } from '../../../helpers/fechas'
import { calcularModeloPromediado } from '../../../helpers/modelo'
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
  const { datos, fechas } = useSelector(state => state.datos)
  const { fechaInicioFaena } = useSelector(state => state.biomasa)
  const diasDesdeHundimiento = dias.map(dia => fechaInicioFaena.diff(fechaInicial, 'days') + dia)

  const { m, b } = calcularModeloPromediado(datos, fechas)
  const pesoInicial = Math.exp(b + m * fechas[0].unix())

  const degradaciones = diasDesdeHundimiento.map(dias => 100 - 100 * Math.exp(b + m * (fechaInicioFaena.clone().add(dias, 'days')).unix()) / pesoInicial)

  return (
    <div className="TablaPorcentajes">
      <h1 className="TablaPorcentajes__titulo">Resultados</h1>
      <div className="TablaPorcentajes__tabla">
        <div className="TablaPorcentajes__fila">
          <div>Fecha</div>
          {dias.map(dia => (
            <div key={`fecha-${dia}`}>{fechaInicioFaena.clone().add(dia, 'days').format('DD/MM')}</div>
          ))}
        </div>
        <div className="TablaPorcentajes__fila">
          <div>Día desde hundimiento</div>
          {diasDesdeHundimiento.map(dia => (
            <div key={`dia-h-${dia}`}>{dia}</div>
          ))}
        </div>
        <div className="TablaPorcentajes__fila">
          <div>Día faena</div>
          {dias.map((dia, i) => (
            <div key={`dia-${dia}`}>
              {dia}
              {/* <input value={dia} type="number" onChange={e => setDias(prevDias => {
                return [...prevDias.slice(0, i), Number(e.target.value), ...prevDias.slice(i + 1)]
              })} /> */}
            </div>
          ))}
        </div>
        {estados.map((estado, i) => (
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
          {degradaciones.map((d, i) => <div key={`degradacion-${i}`}>{d.toLocaleString('de-DE', { maximumFractionDigits: 1 })}%</div>)}
        </div>
      </div>
    </div>
  )
}

export default TablaPorcentajes
