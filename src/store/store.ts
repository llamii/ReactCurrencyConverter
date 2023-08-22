import {
  combine, createEvent, createStore, sample
} from 'effector'
import { Currency, initialCurrencyFrom, initialCurrencyTo } from '../types/Currency'
import { Position } from '../types/Position'
import { Input } from '../types/Input'

//
// Inputs
//

export const $leftInputValue = createStore<Input>({ value: '1', label: '1 RUB = 100 USD' })
export const $rightInputValue = createStore<Input>({ value: '100', label: '1 USD = 0.001 RUB' })

export const setLeftInputValue = createEvent<Input>()
export const setRightInputValue = createEvent<Input>()

$leftInputValue.on(setLeftInputValue, (_, newValue) => newValue).watch((value) => console.log(value))
$rightInputValue.on(setRightInputValue, (_, newValue) => newValue).watch((value) => console.log(value))

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
  $rightInputValue,
  $leftInputValue,
  $currencyTo,
  $currencyFrom
})
$swingers.on(switchButtonClicked, (stores) => {
  setCurrencyFrom(stores.$currencyTo)
  setCurrencyTo(stores.$currencyFrom)
  setLeftInputValue(stores.$rightInputValue)
  setRightInputValue(stores.$leftInputValue)
})
