import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { fechaInicial } from '../../../helpers/fechas'
import { calcularModeloPromediado } from '../../../helpers/modelo'
import NumberFormat from 'react-number-format'
import classNames from 'classnames'
import './TablaPorcentajes.css'

const TablaPorcentajes = () => {

  const biomasaTotal = 2848873 / 1000
  const [dias, setDias] = useState([
    0, 30, 60, 90
  ])
  const [mostrarPorcentajes, setMostrarPorcentajes] = useState(true)
  const { datos, fechas } = useSelector(state => state.datos)
  const { k, c0 } = useSelector(state => state.centro)
  const kDias = k / (60 * 60 * 24)
  const bCentro = Math.log(c0) - (kDias * fechas[0].unix())
  const { fechaInicioFaena, porcentajePeriferia, porcentajeCentro, diasAparicionHuesos, diasAparicionPasta, tasaCambioEstado } = useSelector(state => state.biomasa)
  const diasDesdeHundimiento = dias.map(dia => fechaInicioFaena.diff(fechaInicial, 'days') + dia)

  const { m, b } = calcularModeloPromediado(datos, fechas)
  const pesoInicialModeloPeriferia = Math.exp(b + m * fechas[0].unix())
  const pesoInicialModeloCentro = Math.exp(bCentro + kDias * fechas[0].unix())
  const degradacionPeriferia = dias.map(dias => porcentajePeriferia * (1 - Math.exp(b + m * (fechaInicioFaena.clone().add(dias, 'days')).unix()) / pesoInicialModeloPeriferia))
  const degradacionCentro = dias.map(dias => porcentajeCentro * (1 - Math.exp(bCentro + kDias * (fechaInicioFaena.clone().add(dias, 'days')).unix()) / pesoInicialModeloCentro))
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
        <div>
          <button
            className={classNames({
              TablaPorcentajes__boton_unidades: true,
              'TablaPorcentajes__boton_unidades--activo': !mostrarPorcentajes
            })}
            onClick={() => setMostrarPorcentajes(false)}
          >
            ton
          </button>
          <button
            className={classNames({
              TablaPorcentajes__boton_unidades: true,
              'TablaPorcentajes__boton_unidades--activo': mostrarPorcentajes
            })}
            onClick={() => setMostrarPorcentajes(true)}
          >
            %
          </button>
        </div>
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
