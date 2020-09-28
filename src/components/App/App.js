import React from 'react'
import { useSelector } from 'react-redux'
import Login from '../Login/Login'
import './App.css'

const App = () => {

  const { usuario } = useSelector(state => state.login)

  if (!usuario) {
    return <Login />
  }

  return (
    <div className="App">
      App
    </div>
  )
}

export default App
