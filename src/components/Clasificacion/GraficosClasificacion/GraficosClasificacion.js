import React from 'react'
import { Line, Scatter } from 'react-chartjs-2'
import { useSelector } from 'react-redux'
import './GraficosClasificacion.css'
import moment from 'moment'

const GraficosClasificacion = () => {

  const { datos } = useSelector(state => state.datos)
  return (
    <div className="GraficosClasificacion">
      <Scatter
        data={{
          labels: datos.map(dato => dato.fecha),
          datasets: [{
            backgroundColor: 'red',
            data: datos.map(dato => ({
              x: moment(dato.fecha, 'DD-MM-YYYY').unix(),
              y: dato.largo
            }))
          }]
        }}
        options={{
          maintainAspectRatio: false,
          xAxes: [{
            type: 'linear',
            position: 'bottom'
          }],
          legend: {
            display: false
          }
        }}
      />
    </div>
  )
}

export default GraficosClasificacion
