import React from 'react'
import { Scatter } from 'react-chartjs-2'
import { useSelector } from 'react-redux'
import './GraficosClasificacion.css'
import moment from 'moment'
import { coloresClases } from '../../../helpers/colores'
import { fechaInicial } from '../../../helpers/fechas'

const GraficosClasificacion = () => {

  const { datos, fechas } = useSelector(state => state.datos)
  
  return (
    <div className="GraficosClasificacion">
      <Scatter
        data={{
          labels: datos.map(dato => dato.fecha),
          datasets: [{
            backgroundColor: datos.map(dato => coloresClases[dato.clase]),
            data: datos.map(dato => ({
              x: dato.fecha.unix(),
              y: dato.largo
            }))
          }]
        }}
        options={{
          maintainAspectRatio: false,
          animation: false,
          tooltips: {
            callbacks: {
              title: items => `Pez extraído el ${moment(items[0].label, 'X').format('DD [de] MMMM [de] YYYY')} (día ${moment(items[0].label, 'X').diff(fechaInicial, 'days')})`,
              label: item => `Largo: ${item.value.toLocaleString('de-DE', { maximumFractionDigits: 2 })} cm`
            }
          },
          scales: {
            xAxes: [{
              scaleLabel: {
                display: true,
                labelString: 'Fecha'
              },
              type: 'linear',
              position: 'bottom',
              ticks: {
                callback: value => moment(value, 'X').format('DD/MM')
              }
            }],
            yAxes: [{
              scaleLabel: {
                display: true,
                labelString: 'Largo [cm]'
              }
            }]
          },
          legend: {
            display: false
          }
        }}
      />
    </div>
  )
}

export default GraficosClasificacion
