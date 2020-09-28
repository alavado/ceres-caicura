import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { iniciaSesion } from '../../redux/ducks/login'
import './Login.css'

const Login = () => {

  const [password, setPassword] = useState()
  const dispatch = useDispatch()

  const login = e => {
    e.preventDefault()
    setTimeout(() => dispatch(iniciaSesion(password)), 200 + Math.random() * 1000)
  }

  return (
    <div className="Login">
      <h1>CERES BCA</h1>
      <h2>Acceso a plataforma de modalemiento hundimiento Caicura</h2>
      <form onSubmit={login}>
        <label>Ingrese su contraseña
          <input type="password" onChange={e => setPassword(e.target.value)} />
        </label>
        <button type="submit">Ingresar</button>
      </form>
    </div>
  )
}

export default Login
