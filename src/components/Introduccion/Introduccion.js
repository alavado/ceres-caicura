import React from 'react'
import './Introduccion.css'

const Introduccion = () => {
  return (
    <div className="Introduccion">
      <div className="Introduccion__contenedor">
        <h1 className="Introduccion__titulo">ESTIMACIÓN BIOMASA CENTRO CAICURA BLUMAR</h1>
        <p className="Introduccion__parrafo">Los pasos 2, 3 y 4 permiten estimar el modelo de degradación para peces en la periferia del hundimiento, a partir de los datos del informe de CIBA.</p>
        <p className="Introduccion__parrafo">El paso 5 permite especificar un modelo similar para los peces en el centro de la biomasa.</p>
        <p className="Introduccion__parrafo">En el paso 6 se pueden ver los resultados.</p>
      </div>
    </div>
  )
}

export default Introduccion
