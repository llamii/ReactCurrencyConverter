import React from 'react'
import './styles/App.scss'
import axios from 'axios'

import { useStore } from 'effector-react'
import Converter from './components/Converter/Converter'
import { CurrencyChart } from './components/CurrencyChart/CurrencyChart'
import { CurrencyList } from './components/CurrencyList/CurrencyList'

import { $isCurrencyChartOpen, $isCurrencyListOpen } from './store/display'
import { Settings } from './components/Settings/Settings'

const App = () => {
  const isCurrencyChartOpen = useStore($isCurrencyChartOpen)
  const isCurrencyListOpen = useStore($isCurrencyListOpen)
  axios.get('https://data.fixer.io/api/convert?access_key=16ffae09b01071ce773a7f374bc295ae&from=RUR&to=USD&amount=100')
    .then((response) => console.log(response.data))
  return (
    <div className="App">
      <Converter />
      <div className="bottom">
        <CurrencyList isOpen={isCurrencyListOpen} />
        <Settings />
        <CurrencyChart isOpen={isCurrencyChartOpen} />
      </div>
    </div>
  )
}

export default App
