import React from 'react'
import { Scatter } from 'react-chartjs-2'
import { coloresClases } from '../../../helpers/colores'
import moment from 'moment'
import './GraficoModeloDegradacion.css'

const GraficoModeloDegradacion = ({ b, m, fechas, datos, clase }) => {
  return (
    <div className="GraficoModeloDegradacion">
      <Scatter
        data={{
          labels: fechas.map(fecha => fecha.unix()),
          datasets: [
            {
              data: datos.map(dato => ({
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
  )
}

export default GraficoModeloDegradacion
