import { createEffect } from 'effector'
import axios from 'axios'
import { Currency } from '../types/Currency'

// api key for https://app.freecurrencyapi.com/
const apiKey = process.env.REACT_APP_API_KEY

// fetchCurrencies api endpoint
// Takes array of currency codes (USD, RUS, EUR...)
// Returns all supported currencies if array is empty

const fetchCurrencies = createEffect<string[], Currency[], Error>()
  .use(async (currencyCodes: string[]) => {
    const url = `https://api.freecurrencyapi.com/v1/currencies?apikey=${apiKey}&currencies=${currencyCodes.join(',')}`

    const response = await axios.get(url)
    if (response.data && response.data.data) {
      return Object.values(response.data.data) as Currency[]
    }
    return []
  })

export { fetchCurrencies }
