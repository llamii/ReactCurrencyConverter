import React, { FC } from 'react'
import styles from './ConverterInput.module.scss'
import { Position } from '../../../types/Position'
import { Input } from '../../../types/Input'
import { clsx } from 'clsx'

interface Props {
  value: string;
  label: string;
  disable?: boolean;
  onChange: React.ChangeEventHandler<HTMLInputElement>
}

const ConverterInput: FC<Props> = (props) => {
  const { value, onChange, label , disable} = props

  return (
    <div className={clsx(styles.box, disable && styles.disabled)}>
      <input disabled={disable} className={styles.input} onChange={onChange} value={value} />
      <div className={styles.label}>
        {label}
      </div>
    </div>
  )
}

export default ConverterInput
