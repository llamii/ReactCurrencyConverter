import React, { FC } from 'react'
import styles from './ConverterInput.module.scss'
import { Position } from '../../../types/Position'
import { Input } from '../../../types/Input'

interface Props {
  value: Input;
  position: Position;
  onChange: React.ChangeEventHandler<HTMLInputElement>
}
const ConverterInput: FC<Props> = (props) => {
  const { value, position, onChange } = props

  return (
    <div className={styles.box}>
      <input className={styles.input} onChange={onChange} value={value.value} />
      <div className={styles.label}>
        {value.label}
      </div>
    </div>
  )
}

export default ConverterInput
