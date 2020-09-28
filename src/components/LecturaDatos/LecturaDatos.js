import React, { useRef } from 'react'
import './LecturaDatos.css'

const LecturaDatos = () => {

  const archivo = useRef()

  const leerArchivo = () => {
    archivo.current.files[0].text()
      .then(texto => {
        const lineas = texto.split('\n')
        const datos = []
        lineas.slice(1).forEach(linea => {
          const [id,,,, peso, largo] = linea.split(',')
          datos.push([id, peso, largo])
        })
      })
  }

  return (
    <div className="LecturaDatos">
      <input ref={archivo} type="file" accept=".csv" />
      <button onClick={leerArchivo}>Leer</button>
    </div>
  )
}

export default LecturaDatos
