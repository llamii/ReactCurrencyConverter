import { createEvent, createStore, sample } from 'effector'
import { Currency, initialCurrencyFrom, initialCurrencyTo } from '../types/Currency'
import { Position } from '../types/Position'

export const $currentSelectChosen = createStore<Position | null>(null)

export const selectClicked = createEvent<Position | null>()

$currentSelectChosen.on(selectClicked, (_, newSelected) => newSelected)

// $currentSelectChosen.watch((value) => {
//   console.log(value)
// })

export const $leftInputValue = createStore<string>('1')
export const $rightInputValue = createStore<string>('')

export const $currencyFrom = createStore<Currency>(initialCurrencyFrom)
export const $currencyTo = createStore<Currency>(initialCurrencyTo)

export const setCurrencyFrom = createEvent<Currency>()
export const setCurrencyTo = createEvent<Currency>()

$currencyFrom.on(setCurrencyFrom, (_, newCurrency) => newCurrency)
$currencyTo.on(setCurrencyTo, (_, newCurrency) => newCurrency)

export const switchButtonClicked = createEvent()

// sample({
//
// })
