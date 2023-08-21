import { useStore } from 'effector-react'
import React, { useRef } from 'react'
import ConverterSelect from './ConverterSelect/ConverterSelect'
import ConverterSwitch from './ConverterSwitch/ConverterSwitch'
import ConverterInput from './ConverterInput/ConverterInput'
import ConverterList from './ConverterList/ConverterList'

import { $isOpenConverterList, closeConverterList, toggleConverterList } from '../../store/ConverterList'
import {
  $currencyFrom, $currencyTo, $leftInputValue, $rightInputValue, selectClicked
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

  const leftInput = useStore($leftInputValue)
  const rightInput = useStore($rightInputValue)

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

  return (
    <div className={styles.wrapper}>
      <div className={styles.left}>
        <ConverterSelect position={Position.left} currencyCode={currencyFrom.code} ref={selectRef} onClick={(e) => handleLeftSelectClicked(e)} />
        <ConverterInput position={Position.left} value={leftInput} />
      </div>
      <div className={styles.center}>
        <ConverterSwitch />
      </div>
      <div className={styles.right}>
        <ConverterSelect position={Position.right} currencyCode={currencyTo.code} ref={selectRef} onClick={handleRightSelectClicked} />
        <ConverterInput position={Position.right} value={rightInput} />
      </div>
      <ConverterList opened={isListOpen} onClose={onClose} triggerRef={selectRef} />
    </div>
  )
}

export default Converter
