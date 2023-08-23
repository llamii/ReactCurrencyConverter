import {
  combine,
  createEvent, createStore, sample
} from 'effector'

import { Currency, initialCurrencyFrom, initialCurrencyTo } from '../types/Currency'
import { Position } from '../types/Position'
import { Input } from '../types/Input'
import { validateInput } from '../utils/validation'

//
// Inputs
//

export const $fromInputValue = createStore<Input>({ value: '', label: '' })
export const $toInputValue = createStore<Input>({ value: '', label: '' })

export const inputChanged = createEvent()
export const setFromInputValue = createEvent<Input>()
export const setToInputValue = createEvent<Input>()

$fromInputValue.on(setFromInputValue, (_, newValue) => ({
  ...newValue,
  value: validateInput(newValue.value)
}))

$toInputValue.on(setToInputValue, (_, newValue) => ({
  ...newValue,
  value: validateInput(newValue.value)
}))

//
// Selects
//

export const $currencyFrom = createStore<Currency>(initialCurrencyFrom)
export const $currencyTo = createStore<Currency>(initialCurrencyTo)

export const setCurrencyFrom = createEvent<Currency>()
export const setCurrencyTo = createEvent<Currency>()

$currencyFrom.on(setCurrencyFrom, (_, newCurrency) => newCurrency)
$currencyTo.on(setCurrencyTo, (_, newCurrency) => newCurrency)

export const $currentSelectChosen = createStore<Position | null>(null)

export const selectClicked = createEvent<Position | null>()

$currentSelectChosen.on(selectClicked, (_, newSelected) => newSelected)

//
// Exchange rate
//

export const setExchangeRateFrom = createEvent<number>()

export const setExchangeRateTo = createEvent<number>()

export const $exchangeRateFrom = createStore<number>(0)
  .on(setExchangeRateFrom, (_, rate) => rate)

export const $exchangeRateTo = createStore<number>(0)
  .on(setExchangeRateTo, (_, rate) => rate)

//
// Switch
//
export const switchButtonClicked = createEvent()

const $swingers = combine({
  $exchangeRateFrom,
  $exchangeRateTo,
  $toInputValue,
  $fromInputValue,
  $currencyTo,
  $currencyFrom
})
$swingers.on(switchButtonClicked, (stores) => {
  setExchangeRateFrom(stores.$exchangeRateTo)
  setExchangeRateTo(stores.$exchangeRateFrom)
  setCurrencyFrom(stores.$currencyTo)
  setCurrencyTo(stores.$currencyFrom)
  setFromInputValue(stores.$toInputValue)
  setToInputValue(stores.$fromInputValue)
})

//
// Recalculation of the currency cost after changing the value in 'from' & 'to' inputs
//
//

sample({
  clock: inputChanged,
  source: { value: $fromInputValue, rate: $exchangeRateFrom },
  fn: (({ value, rate }) => ({
    ...value,
    value: (parseFloat(value.value) * rate).toString()
  })),
  target: $fromInputValue
})

// sample({
//   clock: inputChanged,
//   source: {value: $, rate: $b},
//   fn: ((value) => ({
//     ...value,
//     value: (parseFloat(value.value) / $exchangeRateTo.toString()
//   })),
//   target: $toInputValue
// })

// sample({
//   clock: inputChanged,
//   source: [$fromInputValue, $toInputValue],
//   fn: ([fromValue, toValue]: Input[]) => ({
//     from: {
//       ...fromValue,
//       value: (parseFloat(fromValue.value) * $exchangeRate.getState()).toFixed(2).toString()
//     },
//     to: {
//       ...toValue,
//       value: (parseFloat(toValue.value) / $exchangeRate.getState()).toFixed(2).toString()
//     }
//   }),
//   target: [{
//     from: $fromInputValue,
//     to: $toInputValue
//   }]
// })
