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

import { setExchangeRate, $currencyTo, $currencyFrom } from './store/store'


const App = () => {
  const isCurrencyChartOpen = useStore($isCurrencyChartOpen)
  const isCurrencyListOpen = useStore($isCurrencyListOpen)

  const currencyFrom = useStore($currencyFrom)
  const currencyTo = useStore($currencyTo)

  const [chartData, setChartData] = useState<CurrencyHistory[]>([])

  // useEffect(() => {
  //
  //
  //   fetchExchangeRate('USD', 'RUB')
  //     .then((res) => {
  //       setExchangeRate(res)
  //     })
  //     .finally(() => {
  //
  //       // setInputFromValue('10')
  //       // setInputToValue((parseFloat(inputFromValue.value) * exchangeRateFrom).toString())
  //     })
  // }, [])

  useEffect(() => {
    fetchExchangeRate(currencyFrom.code, currencyTo.code)
      .then((res) => {
        setExchangeRate(res)
      })
    fetchCurrencyHistory(currencyFrom.code, currencyTo.code).then((res) => {
      if (res) {
        setChartData(res)
      }
    })
  }, [currencyFrom, currencyTo])


  return (
    <div className="App">
      <div className='settings'>
        <Settings />
      </div>
      <Converter />
      <div className="bottom">
        <CurrencyList isOpen={isCurrencyListOpen} />

        <CurrencyChart data={chartData} isOpen={isCurrencyChartOpen} />
      </div>
      <div className='footer'>
        © Maxim Grinev
      </div>
    </div>
  )
}

export default App
