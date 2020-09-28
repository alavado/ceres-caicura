import React from 'react'
import { NavLink } from 'react-router-dom'
import './Navegacion.css'

const Navegacion = () => {
  return (
    <div className="Navegacion">
      <NavLink to="/">Introducción</NavLink>
      <NavLink to="/datos">Datos</NavLink>
      <NavLink to="/">Clasificación</NavLink>
      <NavLink to="/">Modelos degradación</NavLink>
      <NavLink to="/">Resultados</NavLink>
    </div>
  )
}

export default Navegacion
