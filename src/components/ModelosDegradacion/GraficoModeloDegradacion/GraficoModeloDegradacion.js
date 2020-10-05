import React from 'react'
import { Scatter } from 'react-chartjs-2'
import { coloresClases } from '../../../helpers/colores'
import moment from 'moment'
import './GraficoModeloDegradacion.css'
import { fechaInicial } from '../../../helpers/fechas'

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
          tooltips: {
            callbacks: {
              title: items => `${moment(items[0].label, 'X').format('DD [de] MMMM [de] YYYY')} (día ${moment(items[0].label, 'X').diff(fechaInicial, 'days')})`,
              label: item => item.datasetIndex === 0 ? '' : `Peso promedio: ${(item.value / 1000).toLocaleString('de-DE', { maximumFractionDigits: 2 })} kg`
            }
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
              scaleLabel: {
                display: true,
                labelString: 'Fecha'
              }
            }],
            yAxes: [{
              ticks: {
                min: 0,
                max: 6000
              },
              scaleLabel: {
                display: true,
                labelString: 'Peso [g]'
              }
            }]
          }
        }}
      />
    </div>
  )
}

export default GraficoModeloDegradacion
