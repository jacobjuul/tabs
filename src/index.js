import React from 'react'
import ReactDOM from 'react-dom'
import Tabs from './tabs'

import './styles.scss'

function App() {
  return <Tabs selectedSection="section1" />
}

const rootElement = document.getElementById('root')
ReactDOM.render(<App />, rootElement)
