import { clsx } from 'clsx'
import React, { FC, useState } from 'react'
import arrowExchange from '../../../assets/icons/arrow-exchange.svg'
import styles from './ConverterSwitch.module.scss'
import { switchButtonClicked } from '../../../store/store'

interface Props {
  onClick: () => void;
}

const ConverterSwitch: FC<Props> = (props) => {
  const { onClick } = props
  const [isRotated, setIsRotated] = useState(false)
  const handleSwitchClick = () => {
    setIsRotated((prevState) => !prevState)
    switchButtonClicked()
    onClick()
  }

  return (
    <div onClick={handleSwitchClick}>
      <img className={clsx(styles.exchange, isRotated && styles.rotated)} src={arrowExchange} alt="exchange" />
    </div>
  )
}
export default ConverterSwitch
