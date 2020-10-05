import React from 'react'
import './ParametrosModeloDegradacion.css'

const ParametrosModeloDegradacion = ({ k, c0 }) => {
  return (
    <div className="ParametrosModeloDegradacion">
      <p className="ParametrosModeloDegradacion__titulo">Parámetros estimados</p>
      <p className="ParametrosModeloDegradacion__parametro">C0 = {c0.toLocaleString('de-DE', { maximumFractionDigits: 2 })}</p>
      <p className="ParametrosModeloDegradacion__parametro">k = {(k * (60 * 60 * 24)).toLocaleString('de-DE', { maximumFractionDigits: 10 })}</p>
    </div>
  )
}

export default ParametrosModeloDegradacion
