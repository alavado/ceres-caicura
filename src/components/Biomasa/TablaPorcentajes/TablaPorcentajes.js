import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { fechaInicial } from '../../../helpers/fechas'
import { calcularModeloPromediado } from '../../../helpers/modelo'
import NumberFormat from 'react-number-format'
import './TablaPorcentajes.css'

const TablaPorcentajes = () => {

  const biomasaTotal = 2848873 / 1000
  const [dias, setDias] = useState([
    0, 30, 60, 90
  ])
  const [mostrarPorcentajes, setMostrarPorcentajes] = useState(true)
  const { datos, fechas } = useSelector(state => state.datos)
  const { k, c0 } = useSelector(state => state.centro)
  const { fechaInicioFaena, porcentajePeriferia, porcentajeCentro, diasAparicionHuesos, diasAparicionPasta, tasaCambioEstado } = useSelector(state => state.biomasa)
  const diasDesdeHundimiento = dias.map(dia => fechaInicioFaena.diff(fechaInicial, 'days') + dia)

  const { m, b } = calcularModeloPromediado(datos, fechas)
  const pesoInicialModeloPeriferia = Math.exp(b + m * fechas[0].unix() / (60 * 60 * 24))
  const pesoInicialModeloCentro = c0 * Math.exp(k * fechas[0].unix() / (60 * 60 * 24))
  const degradacionPeriferia = diasDesdeHundimiento.map(dias => (porcentajePeriferia / 100) * (100 - 100 * Math.exp(b + m * (fechaInicioFaena.clone().add(dias, 'days')).unix() / (60 * 60 * 24)) / pesoInicialModeloPeriferia))
  const degradacionCentro = diasDesdeHundimiento.map(dias => (porcentajeCentro / 100) * (100 - 100 * c0 * Math.exp(k * (fechaInicioFaena.clone().add(dias, 'days')).unix() / (60 * 60 * 24)) / pesoInicialModeloCentro))
  const degradaciones = degradacionPeriferia.map((d, i) => d + degradacionCentro[i])

  let pecesEnteros = degradaciones.map(d => 100 - d)
  let huesos = pecesEnteros.map((v, i) => {
    const diasConPerdida = Math.max(0,  diasDesdeHundimiento[i] - diasAparicionHuesos)
    const totalPerdida = diasConPerdida * tasaCambioEstado
    return Math.max(0, Math.min(totalPerdida, v))
  })
  let pasta = pecesEnteros.map((v, i) => {
    const diasConPerdida = Math.max(0, diasDesdeHundimiento[i] - diasAparicionPasta)
    const totalPerdida = diasConPerdida * tasaCambioEstado
    return Math.max(0, Math.min(totalPerdida, v - huesos[i]))
  })
  let mix = pecesEnteros.map((v, i) => {
    const totalPerdida = diasDesdeHundimiento[i] * tasaCambioEstado
    return Math.max(0, Math.min(totalPerdida, v - huesos[i] - pasta[i]))
  })
  pecesEnteros = pecesEnteros.map((v, i) => Math.max(0, v - huesos[i] - pasta[i] - mix[i]))

  const estados = [
    { nombre: 'Peces enteros', valores: pecesEnteros },
    { nombre: 'Mix sólido pasta', valores: mix },
    { nombre: 'Tipo pasta', valores: pasta },
    { nombre: 'Huesos y escamas', valores: huesos }
  ]

  return (
    <div className="TablaPorcentajes">
      <div className="TablaPorcentajes__superior">
        <h1 className="TablaPorcentajes__titulo">Resultados ({mostrarPorcentajes ? '%' : 'ton'})</h1>
        <button onClick={() => setMostrarPorcentajes(!mostrarPorcentajes)}>
          {mostrarPorcentajes ? 'Ver en toneladas' : 'Ver en porcentajes'}
        </button>
      </div>
      <div className="TablaPorcentajes__tabla">
        <div className="TablaPorcentajes__fila">
          <div>Fecha</div>
          {dias.map((dia, i) => (
            <div key={`fecha-${i}`}>
              {fechaInicioFaena.clone().add(dia, 'days').format('DD/MM')}
            </div>
          ))}
        </div>
        <div className="TablaPorcentajes__fila">
          <div>Día desde hundimiento</div>
          {diasDesdeHundimiento.map((dia, i) => (
            <div key={`dia-h-${i}`}>{dia}</div>
          ))}
        </div>
        <div className="TablaPorcentajes__fila">
          <div>Día faena</div>
          {dias.map((dia, i) => (
            <div key={`dia-faena-${i}`}>
              <NumberFormat
                value={dia}
                className="TablaPorcentajes__input" 
                onValueChange={v => setDias(prevDias => {
                  return [
                    ...prevDias.slice(0, i),
                    Number(v.value || 0),
                    ...prevDias.slice(i + 1)
                  ]
                })}
              />
            </div>
          ))}
        </div>
        {estados.map(estado => (
          <div key={estado.nombre} className="TablaPorcentajes__fila">
            <div>{estado.nombre}</div>
            {estado.valores.map((v, i) => (
              <div key={`porcentaje-estado-${estado.nombre}-${i}`}>
                {(mostrarPorcentajes ? v : (v * biomasaTotal / 100)).toLocaleString('de-DE', { maximumFractionDigits: 1 })}{mostrarPorcentajes ? '%' : ''}
              </div>)
            )}
          </div>
        ))}
        <div className="TablaPorcentajes__fila">
          <div>Degradación</div>
          {degradaciones.map((d, i) => (
            <div key={`degradacion-${i}`}>
              {(mostrarPorcentajes ? d : (d * biomasaTotal / 100)).toLocaleString('de-DE', { maximumFractionDigits: 1 })}{mostrarPorcentajes ? '%' : ''}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default TablaPorcentajes
