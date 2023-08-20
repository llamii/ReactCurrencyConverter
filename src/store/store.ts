import { createEvent, createStore } from 'effector'
import { Currency } from '../types/Currency'

const $currentTo = createStore<Currency | null>(null)
const $currentFrom = createStore<Currency | null>(null)

export const $isOpenConverterList = createStore(false)

export const openConverterList = createEvent()
export const closeConverterList = createEvent()

$isOpenConverterList.on(openConverterList, () => true)
$isOpenConverterList.on(closeConverterList, () => false)

$isOpenConverterList.watch((state) => {
  console.log('state', state)
})
