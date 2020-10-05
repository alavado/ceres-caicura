import React from 'react'
import { useSelector } from 'react-redux'
import { coloresClases } from '../../../helpers/colores'
import './TablaClasificacion.css'

const TablaClasificacion = () => {

  const { datos } = useSelector(state => state.datos)

  return (
    <div className="TablaClasificacion">
      <div className="TablaClasificacion__header">
        <div>ID</div>
        <div>Fecha Extracción</div>
        <div>Peso [g]</div>
        <div>Largo estimado [cm]</div>
        <div>Clase</div>
      </div>
      <div>
        {datos.slice().sort((d1, d2) => d1.largo > d2.largo ? 1 : -1).map(({ id, fecha, peso, largo, clase }) => (
          <div className="TablaClasificacion__fila" key={`clasif-${id}`}>
            <div>{id}</div>
            <div>{fecha.format('DD/MM')}</div>
            <div>{peso.toLocaleString('de-DE')}</div>
            <div>{largo.toLocaleString('de-DE')}</div>
            <div className="TablaClasificacion__td_circulito">
              {clase !== undefined &&
                <div
                  className="TablaClasificacion__circulo_clase"
                  style={{ backgroundColor: coloresClases[clase] }} 
                />
              }
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TablaClasificacion
