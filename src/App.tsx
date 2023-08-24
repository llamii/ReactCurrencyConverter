import React, { useEffect, useState } from 'react'
import './styles/App.scss'

import { useStore } from 'effector-react'
import Converter from './components/Converter/Converter'
import { CurrencyChart } from './components/CurrencyChart/CurrencyChart'
import { CurrencyList } from './components/CurrencyList/CurrencyList'

import { $isCurrencyChartOpen, $isCurrencyListOpen } from './store/display'
import { Settings } from './components/Settings/Settings'
import { fetchCurrencyHistory, fetchExchangeRate } from './api/converter_api'
import { CurrencyHistory } from './types/CurrencyHistory'

import { $exchangeRate, setExchangeRate } from './store/store'


const App = () => {
  const isCurrencyChartOpen = useStore($isCurrencyChartOpen)
  const isCurrencyListOpen = useStore($isCurrencyListOpen)

  const exchangeRate = useStore($exchangeRate)

  const [chartData, setChartData] = useState<CurrencyHistory[]>([])

  useEffect(() => {
    fetchCurrencyHistory('USD', 'RUB').then((res) => {
      if (res) {
        setChartData(res)
      }
    })

    fetchExchangeRate('USD', 'RUB')
      .then((res) => {
        setExchangeRate(res)
      })
      .finally(() => {

        // setInputFromValue('10')
        // setInputToValue((parseFloat(inputFromValue.value) * exchangeRateFrom).toString())
      })
  }, [])



  return (
    <div className="App">
      <Converter />
      <div className="bottom">
        <CurrencyList isOpen={isCurrencyListOpen} />
        <Settings />
        <CurrencyChart data={chartData} isOpen={isCurrencyChartOpen} />
      </div>
    </div>
  )
}

export default App
