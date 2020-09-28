import React from 'react'
import LinkNavegacion from './LinkNavegacion'
import './Navegacion.css'

const Navegacion = () => {
  return (
    <div className="Navegacion">
      <LinkNavegacion to="/">Introducción</LinkNavegacion>
      <LinkNavegacion to="/datos">Datos</LinkNavegacion>
      <LinkNavegacion to="/clasificacion">Clasificación</LinkNavegacion>
      <LinkNavegacion to="/modelos">Modelos degradación</LinkNavegacion>
      <LinkNavegacion to="/resultados">Resultados</LinkNavegacion>
    </div>
  )
}

export default Navegacion
