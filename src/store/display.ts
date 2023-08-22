import { createEvent, createStore } from 'effector'

//
// ConverterList
//

export const toggleConverterList = createEvent()
export const closeConverterList = createEvent()
export const $isOpenConverterList = createStore(false)
  .on(toggleConverterList, (prev) => !prev)
  .on(closeConverterList, () => false)

//
// CurrencyChart
//

export const $isCurrencyChartOpen = createStore(true)
export const toggleCurrencyChart = createEvent()
$isCurrencyChartOpen.on(toggleCurrencyChart, (last) => !last)

//
// CurrencyList
//

export const $isCurrencyListOpen = createStore(true)
export const toggleCurrencyList = createEvent()
$isCurrencyListOpen.on(toggleCurrencyList, (last) => !last)
