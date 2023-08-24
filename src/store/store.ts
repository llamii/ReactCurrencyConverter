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

// export const $inputValue = createStore<{ from: Input, to: Input }>(
//   {
//     from: { value: '', label: '' },
//     to: { value: '', label: '' }
//   }
// )

// export const setInputFromValue = createEvent<string>()
//
// export const setInputToValue = createEvent<string>()
//
// $inputValue.on(setInputFromValue, (object, value) => ({
//   to: { ...object.to },
//   from: {
//     ...object.from,
//     value: validateInput(value)
//   }
// }))
//
// $inputValue.on(setInputToValue, (object, value) => ({
//   from: { ...object.from },
//   to: {
//     ...object.to,
//     value: validateInput(value)
//   }
// }))

// export const inputChanged = createEvent()
// export const setFromInputValue = createEvent<Input>()
// export const setToInputValue = createEvent<Input>()

// $fromInputValue.on(setFromInputValue, (_, newValue) => ({
//   ...newValue,
//   value: validateInput(newValue.value)
// }))
//
// $toInputValue.on(setToInputValue, (_, newValue) => ({
//   ...newValue,
//   value: validateInput(newValue.value)
// }))

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

export const setExchangeRate = createEvent<number>()

export const $exchangeRate = createStore<number>(0)
  .on(setExchangeRate, (_, rate) => rate)


//
// Switch
//
export const switchButtonClicked = createEvent()

const $switchers = combine({
  $exchangeRate,
  $currencyTo,
  $currencyFrom
})
$switchers.on(switchButtonClicked, (stores) => {
  setExchangeRate(1/stores.$exchangeRate)
  setCurrencyFrom(stores.$currencyTo)
  setCurrencyTo(stores.$currencyFrom)
})

//
// Recalculation of the currency cost after changing the value in 'from' & 'to' inputs
//
//
//

// sample({
//   clock: inputChanged,
//   source: $inputValue,
//   fn: (({from, to}) => (
//     {
//       from: {
//         ...from,
//         value: (parseFloat(from.value) * $exchangeRateFrom.getState()).toString()
//       },
//       to: {
//         ...to,
//         value: (parseFloat(to.value) * $exchangeRateTo.getState()).toString()
//       }
//    }
//   )),
//   target: $inputValue
// })
// sample({
//   clock: inputChanged,
//   source: {
//     valueFrom: $fromInputValue, valueTo: $toInputValue, rateFrom: $exchangeRateFrom, rateTo: $exchangeRateTo
//   },
//   fn: (({
//     valueFrom, valueTo, rateFrom, rateTo
//   }): [Input, Input] => ([
//     {
//       ...valueFrom,
//       value: (parseFloat(valueFrom.value) * rateFrom).toString()
//     },
//     {
//       ...valueTo,
//       value: (parseFloat(valueTo.value) * rateTo).toString()
//     }
//   ])),
//   target: $toInputValue
// })

// sample({
//   clock: inputChanged,
//   source: { value: $toInputValue, rate: $exchangeRateTo },
//   fn: (({ value, rate }) => ({
//     ...value,
//     value: (parseFloat(value.value) * rate).toString()
//   })),
//   target: $toInputValue
// })
//
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
