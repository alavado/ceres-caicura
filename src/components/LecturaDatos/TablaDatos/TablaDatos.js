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
      <h1>Archivo seleccionado: {nombreArchivo}</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Fecha Extracción</th>
            <th>Peso estimado [g]</th>
            <th>Largo estimado [cm]</th>
          </tr>
        </thead>
        <tbody>
          {datos.map(([id, fecha, peso, largo]) => (
            <tr key={id}>
              <td>{id}</td>
              <td>{fecha}</td>
              <td>{peso}</td>
              <td>{largo}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default TablaDatos
