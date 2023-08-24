import { useStore } from 'effector-react'
import React, { useEffect, useRef, useState } from 'react'
import ConverterSelect from './ConverterSelect/ConverterSelect'
import ConverterSwitch from './ConverterSwitch/ConverterSwitch'
import ConverterInput from './ConverterInput/ConverterInput'
import ConverterList from './ConverterList/ConverterList'

import { $isOpenConverterList, closeConverterList, toggleConverterList } from '../../store/display'
import {
  $currencyFrom,
  $currencyTo,
  $exchangeRate,
  setExchangeRate,
  selectClicked,
} from '../../store/store'
import styles from './Converter.module.scss'
import { Position } from '../../types/Position'
import { fetchExchangeRate } from '../../api/converter_api'
import { validateInput } from '../../utils/validation'

const Converter = () => {
  const isListOpen = useStore($isOpenConverterList)

  const selectRef = useRef<HTMLDivElement>(null)

  const onClose = () => {
    closeConverterList()
  }

  const [fromInput, setFromInput] = useState('100')
  const [toInput, setToInput] = useState('')

  const currencyFrom = useStore($currencyFrom)
  const currencyTo = useStore($currencyTo)

  const exchangeRate = useStore($exchangeRate)

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
    const inputValue = e.target.value.replace(',', '.');
    const parsedValue = parseFloat(inputValue) || 0;
    const validatedValue = validateInput(parsedValue.toString());
    setFromInput(validatedValue);
    setToInput((parsedValue * exchangeRate).toString());
  }

  const handleToInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value.replace(',', '.');
    const parsedValue = parseFloat(inputValue) || 0;
    const validatedValue = validateInput(parsedValue.toString());
    setToInput(validatedValue);
    setFromInput((parsedValue / exchangeRate).toString());
  }

  useEffect(() => {
    console.log(exchangeRate)
  }, [exchangeRate])

  return (
    <div className={styles.wrapper}>
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
          <ConverterSelect position={Position.right} currencyCode={currencyTo.code} ref={selectRef} onClick={(e) => handleRightSelectClicked(e)} />
        </div>
        <ConverterInput onChange={handleToInputChange} position={Position.right} value={toInput} />
      </div>
      <ConverterList opened={isListOpen} onClose={onClose} triggerRef={selectRef} />
    </div>
  )
}

export default Converter
