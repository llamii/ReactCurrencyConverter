import { createEvent, createStore } from 'effector'
import { Currency, initialCurrencyFrom, initialCurrencyTo } from '../types/Currency'
import { WhichConverterListClicked } from '../types/ConverterList'

export const $currentSelectChoosen = createStore<WhichConverterListClicked | null>(null)

export const selectClicked = createEvent< WhichConverterListClicked | null>()

$currentSelectChoosen.on(selectClicked, (_, newSelected) => newSelected)

$currentSelectChoosen.watch((value) => {
  console.log(value)
})

export const $currencyFrom = createStore<Currency>(initialCurrencyFrom)
export const $currencyTo = createStore<Currency>(initialCurrencyTo)

export const setCurrencyFrom = createEvent<Currency>()
export const setCurrencyTo = createEvent<Currency>()

$currencyFrom.on(setCurrencyFrom, (_, newCurrency) => newCurrency)
$currencyTo.on(setCurrencyTo, (_, newCurrency) => newCurrency)
