import React, { useState } from 'react'
import styles from './ConverterInput.module.scss'

const ConverterInput = () => {
  const [value, setValue] = useState('100')

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setValue(event.target.value)

  return (
    <div className={styles.box}>
      <input className={styles.input} onChange={handleChange} value={value} />
      <div className={styles.label}>
        1 USD = 0.9204 EUR
      </div>
    </div>
  )
}

export default ConverterInput
