import React, { FC } from 'react'
import styles from './ConverterInput.module.scss'
import { Position } from '../../../types/Position'
import { Input } from '../../../types/Input'

interface Props {
  value: string;
  label: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>
}

const ConverterInput: FC<Props> = (props) => {
  const { value, onChange, label } = props

  return (
    <div className={styles.box}>
      <input className={styles.input} onChange={onChange} value={value} />
      <div className={styles.label}>
        {label}
      </div>
    </div>
  )
}

export default ConverterInput
