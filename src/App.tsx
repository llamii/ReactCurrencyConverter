import React from 'react'
import './styles/App.scss'
import axios from 'axios'
import Converter from './components/Converter/Converter'
import { CurrencyChart } from './components/CurrencyChart/CurrencyChart'

const App = () => {
  axios.get('https://data.fixer.io/api/convert?access_key=16ffae09b01071ce773a7f374bc295ae&from=RUR&to=USD&amount=100')
    .then((response) => console.log(response.data))
  return (
    <div className="App">
      <Converter />
      <CurrencyChart />
    </div>
  )
}

export default App
