import React from 'react'
import LinkNavegacion from './LinkNavegacion'
import './Navegacion.css'

const Navegacion = () => {
  return (
    <div className="Navegacion">
      <LinkNavegacion to="/">1. Introducción</LinkNavegacion>
      <LinkNavegacion to="/datos">2. Datos</LinkNavegacion>
      <LinkNavegacion to="/clasificacion">3. Clasificación</LinkNavegacion>
      <LinkNavegacion to="/degradacion">4. Modelos degradación</LinkNavegacion>
      <LinkNavegacion to="/biomasa">5. Composición biomasa</LinkNavegacion>
    </div>
  )
}

export default Navegacion
