import React from 'react'
import { Scatter } from 'react-chartjs-2'
import { useSelector } from 'react-redux'
import { max } from 'simple-statistics'
import { coloresClases } from '../../helpers/colores'
import { calcularModelo, calcularModeloPromediado } from '../../helpers/modelo'
import moment from 'moment'
import './ModelosDegradacion.css'
import { Redirect } from 'react-router-dom'
import GraficoModeloDegradacion from './GraficoModeloDegradacion'

const ModelosDegradacion = () => {
  
  const { datos, fechas, nombreArchivo } = useSelector(state => state.datos)

  if (!nombreArchivo) {
    return <Redirect to="/" />
  }

  const { m, b } = calcularModeloPromediado(datos, fechas)
  const clases = Array.from(new Set(datos.map(d => d.clase)))
  
  return (
    <div className="ModelosDegradacion">
      <h1 className="ModelosDegradacion__titulo">Modelo periferia obtenido</h1>
      <p>Este modelo se construye promediando los modelos por clase detallados más abajo</p>
      <div className="ModelosDegradacion__contenedor">
        <div>
          <p>Parámetros estimados</p>
          <p>C0 = {Math.exp(b + m * fechas[0].unix())}</p>
          <p>k = {m}</p>
        </div>
        <GraficoModeloDegradacion
          b={b}
          m={m}
          fechas={fechas}
          datos={datos}
          clase="promedio"
        />
      </div>
      <h1 className="ModelosDegradacion__titulo">Modelos de degradación por clase</h1>
      {clases.map(clase => {
        const datosClase = datos.filter(d => d.clase === clase)
        const minClase = datosClase.reduce((prev, d) => Math.min(prev, d.largo), [datosClase[0].largo])
        const maxClase = datosClase.reduce((prev, d) => Math.max(prev, d.largo), [datosClase[0].largo])
        const promedioClase = max(datosClase.map(d => d.peso))
        const datosRegresion = [...datosClase.map(d => [d.fecha.unix(), d.peso]), ...Array(Math.round(datosClase.length / 2)).fill([fechas[0].unix(), promedioClase])]
        const { m, b } = calcularModelo(datosRegresion.map(([x, y]) => [x, Math.log(y)]))
        return (
          <div key={`contenedor-modelo-${clase}`}>
            <h2>Modelo para clase {clase} ({minClase} cm - {maxClase} cm)</h2>
            <div className="ModelosDegradacion__contenedor">
              <div>
                <p>Parámetros estimados</p>
                <p>C0 = {Math.exp(b + m * fechas[0].unix())}</p>
                <p>k = {m}</p>
              </div>
              <GraficoModeloDegradacion
                b={b}
                m={m}
                fechas={fechas}
                datos={datosClase}
                clase={clase}
              />
            </div>
          </div>
      )})}
    </div>
  )
}

export default ModelosDegradacion
