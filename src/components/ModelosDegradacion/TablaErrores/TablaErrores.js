import React from 'react'
import { useSelector } from 'react-redux'
import './TablaErrores.css'

const TablaErrores = ({ b, m, clase }) => {

  const { datos } = useSelector(state => state.datos)
  const datosClase = datos.filter(d => d.clase === Number(clase))

  return (
    <div className="TablaErrores">
      <div className="TablaErrores__header">
        <div>ID</div>
        <div>P. real [g]</div>
        <div>Modelo [g]</div>
        <div>Error</div>
      </div>
      {datosClase.slice().sort((p1, p2) => p1.peso > p2.peso ? -1 : 1).map(pez => {
        const { id, peso, fecha } = pez
        const pesoModelo = Math.exp(b + m * fecha.unix())
        return (
          <div key={`error-pez-${id}`} className="TablaErrores__fila">
            <div>{id}</div>
            <div>{peso.toLocaleString('de-DE')}</div>
            <div>{pesoModelo.toLocaleString('de-DE', { maximumFractionDigits: 0 })}</div>
            <div>{(100.0 * (1 - peso / pesoModelo)).toLocaleString('de-DE', { maximumFractionDigits: 0 })}%</div>
          </div>
        )
      })}
    </div>
  )
}

export default TablaErrores
