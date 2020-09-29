import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { clasificarPeces } from '../../helpers/clasificacion'
import { guardaEstosDatos } from '../../redux/ducks/datos'
import './Clasificacion.css'
import GraficosClasificacion from './GraficosClasificacion'
import TablaClasificacion from './TablaClasificacion'

const Clasificacion = () => {

  const { datos } = useSelector(state => state.datos)
  const { nombreArchivo } = useSelector(state => state.datos)
  const dispatch = useDispatch()
  const [nClusters, setNClusters] = useState(3)

  if (!nombreArchivo) {
    return <Redirect to="/" />
  }

  const clasificar = e => {
    e.preventDefault()
    console.log(clasificarPeces(datos, nClusters))
    dispatch(guardaEstosDatos(clasificarPeces(datos, nClusters)))
  }

  return (
    <div className="Clasificacion">
      Clasificacion
      <form onSubmit={clasificar}>
        <label>
          Ingrese número de clases:
          <input
            type="number"
            onChange={e => setNClusters(Number(e.target.value))}
            value={nClusters}
            max={5}
            min={2}
          />
        </label>
        <button type="submit">Clasificar peces (IA)</button>
      </form>
      <div className="Clasificacion__contenedor">
        <TablaClasificacion />
        <GraficosClasificacion />
      </div>
    </div>
  )
}

export default Clasificacion
