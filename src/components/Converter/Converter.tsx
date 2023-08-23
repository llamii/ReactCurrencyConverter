import { useStore } from 'effector-react'
import React, { useEffect, useRef } from 'react'
import ConverterSelect from './ConverterSelect/ConverterSelect'
import ConverterSwitch from './ConverterSwitch/ConverterSwitch'
import ConverterInput from './ConverterInput/ConverterInput'
import ConverterList from './ConverterList/ConverterList'

import { $isOpenConverterList, closeConverterList, toggleConverterList } from '../../store/display'
import {
  $currencyFrom,
  $currencyTo,
  $inputValue,
  setInputToValue,
  setInputFromValue,
  selectClicked,
  $exchangeRateFrom,
  $exchangeRateTo,
  setExchangeRateFrom,
  setExchangeRateTo,
  inputChanged
} from '../../store/store'
import styles from './Converter.module.scss'
import { Position } from '../../types/Position'
import { fetchExchangeRate } from '../../api/converter_api'

const Converter = () => {
  const isListOpen = useStore($isOpenConverterList)

  const selectRef = useRef<HTMLDivElement>(null)

  const onClose = () => {
    closeConverterList()
  }

  const currencyFrom = useStore($currencyFrom)
  const currencyTo = useStore($currencyTo)

  const fromInput = useStore($inputValue).from
  const toInput = useStore($inputValue).to

  const exchangeRateFrom = useStore($exchangeRateFrom)
  const exchangeRateTo = useStore($exchangeRateTo)

  const handleLeftSelectClicked = (e: React.MouseEvent<Element, MouseEvent>) => {
    e.stopPropagation()
    selectClicked(Position.left)
    toggleConverterList()
  }

  const handleRightSelectClicked = (e: React.MouseEvent<Element, MouseEvent>) => {
    e.stopPropagation()
    selectClicked(Position.right)
    toggleConverterList()
  }

  const handleFromInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    inputChanged()
    setInputFromValue(e.target.value)
    // setFromInputValue({ value: e.target.value, label: fromInput.label })
  }

  const handleToInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    inputChanged()
    setInputToValue(e.target.value)
    // setToInputValue({ value: e.target.value, label: toInput.label })
  }

  useEffect(() => {
    fetchExchangeRate('USD', 'RUB')
      .then((res) => {
        setExchangeRateFrom(res)
        setExchangeRateTo(1 / res)
      })
      .finally(() => {
        console.log(`EXchange: ${exchangeRateTo}`)
        setInputToValue((exchangeRateFrom * 100).toString())
        setInputFromValue('100')
      })
  }, [])

  return (
    <div className={styles.wrapper}>
      <span>
        From:
        {exchangeRateFrom}
        , to:
        {exchangeRateTo}
      </span>
      <div className={styles.left}>
        <div className={styles.topBar}>
          <span>From:</span>
          <ConverterSelect position={Position.left} currencyCode={currencyFrom.code} ref={selectRef} onClick={(e) => handleLeftSelectClicked(e)} />
        </div>
        <ConverterInput onChange={handleFromInputChange} position={Position.left} value={fromInput} />
      </div>
      <div className={styles.center}>
        <ConverterSwitch />
      </div>
      <div className={styles.right}>
        <div className={styles.topBar}>
          <span>To:</span>
          <ConverterSelect position={Position.right} currencyCode={currencyTo.code} ref={selectRef} onClick={handleRightSelectClicked} />
        </div>
        <ConverterInput onChange={handleToInputChange} position={Position.right} value={toInput} />
      </div>
      <ConverterList opened={isListOpen} onClose={onClose} triggerRef={selectRef} />
    </div>
  )
}

export default Converter
