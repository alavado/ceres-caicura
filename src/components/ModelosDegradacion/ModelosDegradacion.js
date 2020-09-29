import React from 'react'
import { Scatter } from 'react-chartjs-2'
import { useSelector } from 'react-redux'
import { coloresClases } from '../../helpers/colores'
import './ModelosDegradacion.css'

const ModelosDegradacion = () => {
  
  const { datos, fechas } = useSelector(state => state.datos)
  console.log(fechas)

  const clases = Array.from(new Set(datos.map(d => d.clase)))
  
  return (
    <div className="ModelosDegradacion">
      {clases.map(clase => {
        const datosClase = datos.filter(d => d.clase === clase)
        const minClase = datosClase.reduce((prev, d) => Math.min(prev, d.largo), [datosClase[0].largo])
        const maxClase = datosClase.reduce((prev, d) => Math.max(prev, d.largo), [datosClase[0].largo])
        return (
          <>
            <h2>Modelo para clase {clase} ({minClase} cm - {maxClase} cm)</h2>
            <div className="ModelosDegradacion__contenedor">
              <div>
                Parámetros
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
                    ]
                  }}
                  options={{
                    maintainAspectRatio: false,
                    legend: {
                      display: false
                    },
                    scales: {
                      xAxes: [{
                        gridLines: {
                          display: false
                        },
                        scaleLabel: 'Fecha'
                      }],
                      yAxes: [{
                        ticks: {
                          min: datos.reduce((prev, v) => Math.min(prev, v.peso), datos[0].peso),
                          max: datos.reduce((prev, v) => Math.max(prev, v.peso), datos[0].peso),
                        },
                        scaleLabel: 'Peso [g]'
                      }]
                    }
                  }}
                />
              </div>
            </div>
          </>
      )})}
    </div>
  )
}

export default ModelosDegradacion
