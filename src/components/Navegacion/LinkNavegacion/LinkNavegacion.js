import React from 'react'
import { NavLink } from 'react-router-dom'
import './LinkNavegacion.css'

const LinkNavegacion = ({ to, children }) => {
  return (
    <NavLink
      className="LinkNavegacion"
      activeClassName="LinkNavegacion--activo"
      exact
      to={to}
    >
      {children}
    </NavLink>
  )
}

export default LinkNavegacion
