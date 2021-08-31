import React from 'react'
import { Router } from '@reach/router'
import Home from './pages/Home'
import './styles/global.scss'
import TwitterList from './pages/TwitterList'

const App = () => {
  return (
    <div>
      <Router>
        <Home path="/" exact={true} />
        <TwitterList path="/list" exact={true} />
      </Router>
    </div>
  )
}

export default App