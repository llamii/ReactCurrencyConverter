import {
  combine, createEvent, createStore
} from 'effector'
import { Currency, initialCurrencyFrom, initialCurrencyTo } from '../types/Currency'
import { Position } from '../types/Position'
import { Input } from '../types/Input'
import { validateInput } from '../utils/validation'

//
// Inputs
//

export const $fromInputValue = createStore<Input>({ value: '1', label: '1 RUB = 100 USD' })
export const $toInputValue = createStore<Input>({ value: '100', label: '1 USD = 0.001 RUB' })

export const setFromInputValue = createEvent<Input>()
export const setToInputValue = createEvent<Input>()

$fromInputValue.on(setFromInputValue, (_, newValue) => ({
  ...newValue,
  value: validateInput(newValue.value)
})).watch((value) => console.log(value.value))

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
// Switch
//

export const switchButtonClicked = createEvent()

const $swingers = combine({
  $toInputValue,
  $fromInputValue,
  $currencyTo,
  $currencyFrom
})
$swingers.on(switchButtonClicked, (stores) => {
  setCurrencyFrom(stores.$currencyTo)
  setCurrencyTo(stores.$currencyFrom)
  setFromInputValue(stores.$toInputValue)
  setToInputValue(stores.$fromInputValue)
})
