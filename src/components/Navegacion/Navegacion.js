import React from 'react'
import LinkNavegacion from './LinkNavegacion'
import './Navegacion.css'

const links = [
  { ruta: '/', nombre: 'Introducción' },
  { ruta: '/datos', nombre: 'Selección de datos' },
  { ruta: '/clasificacion', nombre: 'Clasificación' },
  { ruta: '/degradacion', nombre: 'Modelo periferia' },
  { ruta: '/centro', nombre: 'Modelo centro' },
  { ruta: '/biomasa', nombre: 'Composición biomasa' }
]

const Navegacion = () => {
  return (
    <div className="Navegacion">
      {links.map(({ ruta, nombre }, i) => (
        <LinkNavegacion key={`nav-${i}`} paso={i + 1} to={ruta}>
          {nombre}
        </LinkNavegacion>
      ))}
    </div>
  )
}

export default Navegacion
