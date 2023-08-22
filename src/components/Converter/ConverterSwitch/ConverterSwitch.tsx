import { clsx } from 'clsx'
import { useState } from 'react'
import arrowExchange from '../../../assets/icons/arrow-exchange.svg'

import styles from './ConverterSwitch.module.scss'
import { switchButtonClicked } from '../../../store/store'

const ConverterSwitch = () => {
  const [isRotated, setIsRotated] = useState(false)
  const handleSwitchClick = () => {
    setIsRotated((prevState) => !prevState)
    switchButtonClicked()
  }

  return (
    <img className={clsx(styles.exchange, isRotated && styles.rotated)} src={arrowExchange} alt="exchange" onClick={handleSwitchClick} />
  )
}
export default ConverterSwitch
