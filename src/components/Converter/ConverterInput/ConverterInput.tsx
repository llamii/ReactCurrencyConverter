import React, { FC, useState } from 'react'
import styles from './ConverterInput.module.scss'
import { Position } from '../../../types/Position'

interface Props {
  value: string;
  position: Position;
}
const ConverterInput: FC<Props> = (props) => {
  const { value, position } = props
  const [inputValue, setInputValue] = useState(value)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setInputValue(event.target.value)

  return (
    <div className={styles.box}>
      <input className={styles.input} onChange={handleChange} value={inputValue} />
      <div className={styles.label}>
        1 USD = 0.9204 EUR
      </div>
    </div>
  )
}

export default ConverterInput
