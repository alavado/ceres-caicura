import React, { useRef } from 'react'
import { useDispatch } from 'react-redux'
import './LecturaDatos.css'
import TablaDatos from './TablaDatos'
import { guardaEstosDatos } from '../../redux/ducks/datos'

const LecturaDatos = () => {

  const archivo = useRef()
  const dispatch = useDispatch()

  const leerArchivo = () => {
    archivo.current.files[0].text()
      .then(texto => {
        const lineas = texto.split('\n')
        const datos = []
        lineas.slice(1).forEach(linea => {
          const [id,fecha,,,, peso, largo] = linea.split(',')
          datos.push([id, fecha, peso, largo])
        })
        dispatch(guardaEstosDatos(datos, archivo.current.files[0].name))
      })
  }

  return (
    <div className="LecturaDatos">
      <h1 className="LecturaDatos__titulo">Seleccione el archivo con datos de los peces</h1>
      <input className="LecturaDatos__boton" ref={archivo} type="file" accept=".csv" onChange={leerArchivo} />
      <TablaDatos />
    </div>
  )
}

export default LecturaDatos
