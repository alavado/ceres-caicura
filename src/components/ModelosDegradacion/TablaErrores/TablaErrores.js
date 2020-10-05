import React from 'react'
import { useSelector } from 'react-redux'
import './TablaErrores.css'

const TablaErrores = () => {

  const { datos } = useSelector(state => state.biomasa)
  console.log(datos)

  return (
    <div className="TablaErrores">
      
    </div>
  )
}

export default TablaErrores
