import React from 'react'
import { useSelector } from 'react-redux'
import { Route, Switch } from 'react-router-dom'
import Header from '../Header/Header'
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
      <Switch>
        <Route exact path="/" component={() => 'Explicación'} />
        <Route path="/datos" component={LecturaDatos} />
      </Switch>
      <Navegacion />
    </div>
  )
}

export default App
