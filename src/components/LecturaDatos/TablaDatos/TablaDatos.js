import React from 'react'
import { useSelector } from 'react-redux'
import './TablaDatos.css'

const TablaDatos = () => {

  const { datos, nombreArchivo } = useSelector(state => state.datos)

  if (!datos || !nombreArchivo) {
    return null
  }

  return (
    <div className="TablaDatos">
      <h1 className="TablaDatos__nombre_archivo">Archivo seleccionado: {nombreArchivo}</h1>
      <table className="TablaDatos__tabla">
        <thead>
          <tr className="TablaDatos__fila">
            <th>ID</th>
            <th>Fecha Extracción</th>
            <th>Peso [g]</th>
            <th>Largo estimado [cm]</th>
          </tr>
        </thead>
        <tbody>
          {datos.map(({ id, fecha, peso, largo }) => (
            <tr className="TablaDatos__fila" key={id}>
              <td>{id}</td>
              <td>{fecha.format('DD/MM')}</td>
              <td>{peso.toLocaleString('de-DE')}</td>
              <td>{largo.toLocaleString('de-DE')}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default TablaDatos
