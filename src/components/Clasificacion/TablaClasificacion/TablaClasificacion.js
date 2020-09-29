import React from 'react'
import { useSelector } from 'react-redux'
import './TablaClasificacion.css'

const TablaClasificacion = () => {

  const { datos } = useSelector(state => state.datos)

  return (
    <div className="TablaClasificacion">
      <div className="TablaClasificacion__header">
        <div>ID</div>
        <div>Fecha Extracción</div>
        <div>Peso estimado [g]</div>
        <div>Largo estimado [cm]</div>
        <div>Clase</div>
      </div>
      <div>
        {datos.slice().sort((d1, d2) => d1.largo > d2.largo ? 1 : -1).map(({ id, fecha, peso, largo, clase }) => (
          <div className="TablaClasificacion__fila" key={`clasif-${id}`}>
            <div>{id}</div>
            <div>{fecha}</div>
            <div>{peso}</div>
            <div>{largo}</div>
            <div>{clase}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TablaClasificacion
