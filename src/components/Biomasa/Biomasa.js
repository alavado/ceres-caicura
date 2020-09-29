import React from 'react'
import { useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'
import './Biomasa.css'

const Biomasa = () => {

  const { nombreArchivo } = useSelector(state => state.datos)

  if (!nombreArchivo) {
    return <Redirect to="/" />
  }

  return (
    <div className="Biomasa">
      fecha inicio faena
      react-datepicker
    </div>
  )
}

export default Biomasa
