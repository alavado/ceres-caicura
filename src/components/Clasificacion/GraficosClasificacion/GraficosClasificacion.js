import React from 'react'
import { Scatter } from 'react-chartjs-2'
import { useSelector } from 'react-redux'
import './GraficosClasificacion.css'
import moment from 'moment'
import { coloresClases } from '../../../helpers/colores'

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
          scales: {
            xAxes: [{
              scaleLabel: 'Fecha',
              type: 'linear',
              position: 'bottom',
              ticks: {
                callback: value => moment(value, 'X').format('DD/MM')
              }
            }],
            yAxes: [{
              scaleLabel: 'Largo [cm]'
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
