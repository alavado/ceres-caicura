import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { clasificarPeces } from '../../helpers/clasificacion'
import { guardaEstosDatos } from '../../redux/ducks/datos'
import './Clasificacion.css'
import GraficosClasificacion from './GraficosClasificacion'
import TablaClasificacion from './TablaClasificacion'

const Clasificacion = () => {

  const [metodo, setMetodo] = useState('simple')
  const { datos } = useSelector(state => state.datos)
  const { nombreArchivo } = useSelector(state => state.datos)
  const dispatch = useDispatch()
  const [nClusters, setNClusters] = useState(3)

  if (!nombreArchivo) {
    return <Redirect to="/" />
  }

  const clasificar = e => {
    e.preventDefault()
    dispatch(guardaEstosDatos(clasificarPeces(datos, nClusters, metodo)))
  }

  return (
    <div className="Clasificacion">
      <h1 className="Clasificacion__titulo">Clasificacion por largo de pez</h1>
      <form className="Clasificacion__parametros" onSubmit={clasificar}>
        <label className="Clasificacion__parametro">
          <div className="Clasificacion__label">Número de clases:</div>
          <input
            type="number"
            onChange={e => setNClusters(Number(e.target.value))}
            value={nClusters}
            max={5}
            min={1}
          />
        </label>
        <label className="Clasificacion__parametro">
          <div className="Clasificacion__label">Método:</div>
          <select value={metodo} onChange={e => setMetodo(e.target.value)}>
            <option value="simple">Partición simple</option>
            <option value="automatico">Análisis de grupos</option>
          </select>
        </label>
        <button className="Clasificacion__boton" type="submit">Clasificar peces</button>
      </form>
      <div className="Clasificacion__contenedor">
        <TablaClasificacion />
        <GraficosClasificacion />
      </div>
    </div>
  )
}

export default Clasificacion
