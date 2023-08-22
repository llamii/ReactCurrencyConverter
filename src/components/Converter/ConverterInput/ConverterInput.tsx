import React, { FC, useEffect, useState } from 'react'
import styles from './ConverterInput.module.scss'
import { Position } from '../../../types/Position'
import { Input } from '../../../types/Input'

interface Props {
  value: Input;
  position: Position;
}
const ConverterInput: FC<Props> = (props) => {
  const { value, position } = props
  const [inputValue, setInputValue] = useState(value.value)
  const [labelValue, setLabelValue] = useState(value.label)
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value)
  }

  useEffect(() => {
    console.log(value)
    setInputValue((value.value))
    setLabelValue((value.label))
  }, [value])

  return (
    <div className={styles.box}>
      <input className={styles.input} onChange={handleChange} value={inputValue} />
      <div className={styles.label}>
        {labelValue}
      </div>
    </div>
  )
}

export default ConverterInput
