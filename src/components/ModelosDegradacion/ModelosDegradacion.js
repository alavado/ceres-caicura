import React from 'react'
import { Scatter } from 'react-chartjs-2'
import { useSelector } from 'react-redux'
import { max } from 'simple-statistics'
import { coloresClases } from '../../helpers/colores'
import { calcularModelo } from '../../helpers/modelo'
import moment from 'moment'
import './ModelosDegradacion.css'
import { Redirect } from 'react-router-dom'

const ModelosDegradacion = () => {
  
  const { datos, fechas, nombreArchivo } = useSelector(state => state.datos)

  if (!nombreArchivo) {
    return <Redirect to="/" />
  }

  const clases = Array.from(new Set(datos.map(d => d.clase)))
  
  return (
    <div className="ModelosDegradacion">
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
                <p>Parámetros</p>
                <p>C0 = {Math.exp(b + m * fechas[0].unix())}</p>
                <p>k = {m}</p>
              </div>
              <div className="ModelosDegradacion__grafico">
                <Scatter
                  data={{
                    labels: fechas.map(fecha => fecha.unix()),
                    datasets: [
                      {
                        data: datosClase.map(dato => ({
                          x: dato.fecha.unix(),
                          y: dato.peso
                        })),
                        backgroundColor: coloresClases[clase]
                      },
                      {
                        data: fechas.map(fecha => ({
                          x: fecha.unix(),
                          y: Math.exp(b + m * fecha.unix())
                        })),
                        pointRadius: 1,
                        backgroundColor: 'orange',
                      }
                    ]
                  }}
                  options={{
                    animation: false,
                    maintainAspectRatio: false,
                    legend: {
                      display: false
                    },
                    scales: {
                      xAxes: [{
                        gridLines: {
                          display: false
                        },
                        ticks: {
                          min: fechas[0].unix(),
                          callback: value => moment(value, 'X').format('DD/MM')
                        },
                        scaleLabel: 'Fecha'
                      }],
                      yAxes: [{
                        ticks: {
                          min: 0,
                          max: 6000
                        },
                        scaleLabel: 'Peso [g]'
                      }]
                    }
                  }}
                />
              </div>
            </div>
          </div>
      )})}
    </div>
  )
}

export default ModelosDegradacion
