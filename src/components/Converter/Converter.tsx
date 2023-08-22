import { useStore } from 'effector-react'
import React, { useRef } from 'react'
import ConverterSelect from './ConverterSelect/ConverterSelect'
import ConverterSwitch from './ConverterSwitch/ConverterSwitch'
import ConverterInput from './ConverterInput/ConverterInput'
import ConverterList from './ConverterList/ConverterList'

import { $isOpenConverterList, closeConverterList, toggleConverterList } from '../../store/display'
import {
  $currencyFrom, $currencyTo, $fromInputValue, $toInputValue, selectClicked, setFromInputValue, setToInputValue
} from '../../store/store'
import styles from './Converter.module.scss'
import { Position } from '../../types/Position'

const Converter = () => {
  const isListOpen = useStore($isOpenConverterList)

  const selectRef = useRef<HTMLDivElement>(null)

  const onClose = () => {
    closeConverterList()
  }

  const currencyFrom = useStore($currencyFrom)
  const currencyTo = useStore($currencyTo)

  const fromInput = useStore($fromInputValue)
  const toInput = useStore($toInputValue)

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
    setFromInputValue({ value: e.target.value, label: fromInput.label })
  }

  const handleToInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setToInputValue({ value: e.target.value, label: toInput.label })
  }

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
          <ConverterSelect position={Position.right} currencyCode={currencyTo.code} ref={selectRef} onClick={handleRightSelectClicked} />
        </div>
        <ConverterInput onChange={handleToInputChange} position={Position.right} value={toInput} />
      </div>
      <ConverterList opened={isListOpen} onClose={onClose} triggerRef={selectRef} />
    </div>
  )
}

export default Converter
