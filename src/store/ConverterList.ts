import { createEvent, createStore } from 'effector'

export const toggleConverterList = createEvent()
export const closeConverterList = createEvent()
export const $isOpenConverterList = createStore(false)
  .on(toggleConverterList, (prev) => !prev)
  .on(closeConverterList, () => false)
