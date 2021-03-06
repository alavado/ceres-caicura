import React, { useEffect } from 'react'
import { Scatter } from 'react-chartjs-2'
import { useDispatch, useSelector } from 'react-redux'
import { coloresClases } from '../../helpers/colores'
import moment from 'moment'
import './ModeloCentro.css'
import { bloqueaValores, cambiaC0, cambiaK } from '../../redux/ducks/centro'
import { fechaInicial } from '../../helpers/fechas'
import { calcularModeloPromediado } from '../../helpers/modelo'

const ModeloCentro = () => {
  
  const { k, c0, fueCambiado } = useSelector(state => state.centro)
  const { fechas, datos } = useSelector(state => state.datos)
  const dispatch = useDispatch()
  const kDias = k / (60 * 60 * 24)
  const b = Math.log(c0) - (kDias * fechas[0].unix())

  useEffect(() => {
    if (fueCambiado || datos.length === 0 || fechas.length === 0) {
      return
    }
    const { m, b } = calcularModeloPromediado(datos, fechas)
    const pesoInicialModeloPeriferia = Math.exp(b + m * fechas[0].unix())
    dispatch(cambiaC0(pesoInicialModeloPeriferia))
    dispatch(cambiaK(m * (60 * 60 * 24)))
  }, [datos, fechas, dispatch, fueCambiado])

  return (
    <div className="ModeloCentro">
      <h1 className="ModeloCentro__titulo">Modelo centro (especificación manual)</h1>
      <div className="ModeloCentro__parametros">
        <label className="ModeloCentro__parametro">
          <div className="ModeloCentro__label">Peso inicial [g]:</div>
          <input
            className="ModeloCentro__input"
            type="number"
            onChange={e => {
              dispatch(cambiaC0(Number(e.target.value)))
              dispatch(bloqueaValores())
            }}
            value={c0}
            step={10}
          />
        </label>
        <label className="ModeloCentro__parametro">
          <div className="ModeloCentro__label">Tasa de degradación k:</div>
          <input
            className="ModeloCentro__input"
            type="number"
            onChange={e => {
              dispatch(cambiaK(Number(e.target.value)))
              dispatch(bloqueaValores())
            }}
            value={k}
            max={0}
            min={-1}
            step={0.0001}
          />
        </label>
      </div>
      <div className="ModeloCentro__grafico">
        <Scatter
          data={{
            labels: fechas.map(fecha => fecha.unix()),
            datasets: [
              {
                label: 'Peces',
                data: datos.map(dato => ({
                  x: dato.fecha.unix(),
                  y: dato.peso
                })),
                backgroundColor: coloresClases['promedio']
              },
              {
                label: 'Modelo',
                data: fechas.map(fecha => ({
                  x: fecha.unix(),
                  y: Math.exp(b + kDias * fecha.unix())
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
                title: items => `${moment(items[0].label, 'X').format('DD [de] MMMM [de] YYYY')} (día ${moment(items[0].label, 'X').diff(moment(fechaInicial), 'days')})`,
                label: item => item.datasetIndex === 0 ? null : `Peso promedio: ${(item.value / 1000).toLocaleString('de-DE', { maximumFractionDigits: 2 })} kg`
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
