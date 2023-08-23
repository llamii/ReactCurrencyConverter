import axios from 'axios'
import { Currency } from '../types/Currency'
import { CurrencyHistory } from '@/types/CurrencyHistory'

// api key for https://app.freecurrencyapi.com/
const apiKey = process.env.REACT_APP_API_KEY

const baseUrl = 'https://api.freecurrencyapi.com/v1/'

// fetchCurrencies api endpoint
// Takes array of currency codes (USD, RUS, EUR...)
// Returns all supported currencies if array is empty

const fetchCurrencies = async (currencyCodes: string[]) => {
  const url = `${baseUrl}currencies?apikey=${apiKey}&currencies=${currencyCodes.join(',')}`

  const response = await axios.get(url)
  if (response.data && response.data.data) {
    return Object.values(response.data.data) as Currency[]
  }
  return []
}

// fetchExchangeRate api endpoint
// Takes two string values: the currency to which to transfer and from which to transfer

const fetchExchangeRate = async (fromCurrency: string, toCurrency: string) => {
  const url = `${baseUrl}latest?apikey=${apiKey}&currencies=${toCurrency}&base_currency=${fromCurrency}`

  const response = await axios.get(url)
  if (response.data && response.data.data) {
    const exchangeRate = response.data.data[toCurrency]
    return exchangeRate !== undefined ? exchangeRate : null
  }
  return null
}

export { fetchCurrencies, fetchExchangeRate }

// fetch currency last 10 days history
// Takes two currencies and returns and array of dates and exchange rate on this day

export const fetchCurrencyHistory = async (fromCurrency: string, toCurrency: string) => {
  const today = new Date()
  today.setDate(today.getDate() - 1)
  const dateTo = today.toISOString().slice(0, 10)

  const elevenDaysAgo = new Date()
  elevenDaysAgo.setDate(today.getDate() - 11)
  const dateFrom = elevenDaysAgo.toISOString().slice(0, 10)
  const url = `${baseUrl}historical?apikey=${apiKey}&currencies=${toCurrency}&base_currency=${fromCurrency}&date_from=${dateFrom}&date_to=${dateTo}`

  const response = await axios.get(url)
  const historyData = response.data?.data

  if (!historyData) {
    return null
  }

  const historyArray: CurrencyHistory[] = Object.entries(historyData).map(([date, currencies]) => ({
    date,
    value: parseFloat((currencies as Record<string, number>)[toCurrency].toFixed(2))
  }))

  return historyArray
}
