import React from 'react'
import { useSelector } from 'react-redux'
import './TablaClasificacion.css'

const TablaClasificacion = () => {

  const { datos } = useSelector(state => state.datos)

  const clasificar = e => {
    e.preventDefault()
  }

  return (
    <div className="TablaClasificacion">
      <form onSubmit={clasificar}>
        <label>
          Ingrese número de clases:
          <input type="number" max={5} min={2} />
        </label>
        <button type="submit">Clasificar peces</button>
      </form>
      <div className="TablaClasificacion__header">
        <div>ID</div>
        <div>Fecha Extracción</div>
        <div>Peso estimado [g]</div>
        <div>Largo estimado [cm]</div>
      </div>
      <div>
        {datos.map(([id, fecha, peso, largo]) => (
          <div className="TablaClasificacion__fila" key={`clasif-${id}`}>
            <div>{id}</div>
            <div>{fecha}</div>
            <div>{peso}</div>
            <div>{largo}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TablaClasificacion
