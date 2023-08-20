import { createEvent, createStore } from 'effector'

export const $isOpenConverterList = createStore(false)

export const openConverterList = createEvent()
export const closeConverterList = createEvent()

$isOpenConverterList.on(openConverterList, () => true)
$isOpenConverterList.on(closeConverterList, () => false)
