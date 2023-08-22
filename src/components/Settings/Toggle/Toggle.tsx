import React from 'react'
import styles from './Toggle.module.scss'

interface Props {
  checked: boolean;
  onChange: (isChecked: boolean) => void;
}

const Toggle: React.FC<Props> = (props) => {
  const { checked, onChange } = props
  const handleToggle = () => {
    onChange(!checked)
  }

  return (
    <label className={styles.toggleSwitch}>
      <input
        type="checkbox"
        checked={checked}
        onChange={handleToggle}
        className={styles.checkbox}
      />
      <span className={styles.slider} />
    </label>
  )
}
export { Toggle }
