import React from 'react'
import LinkNavegacion from './LinkNavegacion'
import './Navegacion.css'

const Navegacion = () => {
  return (
    <div className="Navegacion">
      <LinkNavegacion to="/">1. Introducción</LinkNavegacion>
      <LinkNavegacion to="/datos">2. Datos</LinkNavegacion>
      <LinkNavegacion to="/clasificacion">3. Clasificación</LinkNavegacion>
      <LinkNavegacion to="/modelos">4. Modelos degradación</LinkNavegacion>
      <LinkNavegacion to="/resultados">5. Resultados</LinkNavegacion>
    </div>
  )
}

export default Navegacion
