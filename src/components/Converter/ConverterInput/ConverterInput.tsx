import React, { FC } from 'react'
import styles from './ConverterInput.module.scss'
import { clsx } from 'clsx'

interface Props {
  value: string;
  label: string;
  disable?: boolean;
  onChange?: React.ChangeEventHandler<HTMLInputElement>
}

const ConverterInput: FC<Props> = (props) => {
  const { value, onChange, label , disable} = props

  return (
    <div className={clsx(styles.box, disable && styles.disabled)}>
      <input type='number' disabled={disable} className={styles.input} onChange={onChange} value={value} />
      <div className={styles.label}>
        {label}
      </div>
    </div>
  )
}

export default ConverterInput
