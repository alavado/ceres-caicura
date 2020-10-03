import React, { useState } from 'react'
import { Scatter } from 'react-chartjs-2'
import { useSelector } from 'react-redux'
import { coloresClases } from '../../helpers/colores'
import moment from 'moment'
import './ModeloCentro.css'

const ModeloCentro = () => {
  
  const [k, setK] = useState(-0.0000000448)
  const [c0, setC0] = useState(4215)
  const { fechas, datos } = useSelector(state => state.datos)
  const b = Math.log(c0) - (k * fechas[0].unix())

  return (
    <div className="ModeloCentro">
      <h1>Modelo centro</h1>
      <div>
        <label>
          Peso inicial (C0):
          <input
            type="number"
            onChange={e => setC0(Number(e.target.value))}
            value={c0}
          />
        </label>
        <label>
          Tasa de degradación (k):
          <input
            type="number"
            onChange={e => setK(Number(e.target.value))}
            value={k}
            step={0.00000001}
          />
        </label>
      </div>
      <div className="ModeloCentro__grafico">
        <Scatter
          data={{
            labels: fechas.map(fecha => fecha.unix()),
            datasets: [
              {
                data: datos.map(dato => ({
                  x: dato.fecha.unix(),
                  y: dato.peso
                })),
                backgroundColor: coloresClases['promedio']
              },
              {
                data: fechas.map(fecha => ({
                  x: fecha.unix(),
                  y: Math.exp(b + k * fecha.unix())
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
  )
}

export default ModeloCentro
