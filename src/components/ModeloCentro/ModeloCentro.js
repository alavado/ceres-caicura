import React from 'react'
import { Scatter } from 'react-chartjs-2'
import { useDispatch, useSelector } from 'react-redux'
import { coloresClases } from '../../helpers/colores'
import moment from 'moment'
import './ModeloCentro.css'
import { cambiaC0, cambiaK } from '../../redux/ducks/centro'

const ModeloCentro = () => {
  
  const { k, c0 } = useSelector(state => state.centro)
  const { fechas, datos } = useSelector(state => state.datos)
  const dispatch = useDispatch()
  const b = Math.log(c0) - (k * fechas[0].unix())

  return (
    <div className="ModeloCentro">
      <h1 className="ModeloCentro__titulo">Modelo centro (especificación manual)</h1>
      <div className="ModeloCentro__parametros">
        <label className="ModeloCentro__parametro">
          <div className="ModeloCentro__label">Peso inicial (C0):</div>
          <input
            type="number"
            onChange={e => dispatch(cambiaC0(Number(e.target.value)))}
            value={c0}
            step={10}
          />
        </label>
        <label className="ModeloCentro__parametro">
          <div className="ModeloCentro__label">Tasa de degradación (k):</div>
          <input
            type="number"
            onChange={e => dispatch(cambiaK(Number(e.target.value)))}
            value={k}
            step={0.0000000005}
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
            tooltips: {
              callbacks: {
                title: items => moment(items[0].label, 'X').format('DD [de] MMMM [de] YYYY'),
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
    </div>
  )
}

export default ModeloCentro
