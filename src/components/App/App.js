import React from 'react'
import { useSelector } from 'react-redux'
import { Route, Switch } from 'react-router-dom'
import Clasificacion from '../Clasificacion'
import Header from '../Header/Header'
import Introduccion from '../Introduccion'
import LecturaDatos from '../LecturaDatos'
import Login from '../Login/Login'
import Navegacion from '../Navegacion'
import './App.css'

const App = () => {

  const { usuario } = useSelector(state => state.login)

  if (!usuario) {
    return <Login />
  }

  return (
    <div className="App">
      <Header />
      <div className="App__contenedor">
        <Switch>
          <Route exact path="/" component={Introduccion} />
          <Route path="/datos" component={LecturaDatos} />
          <Route path="/clasificacion" component={Clasificacion} />
        </Switch>
      </div>
      <Navegacion />
    </div>
  )
}

export default App
