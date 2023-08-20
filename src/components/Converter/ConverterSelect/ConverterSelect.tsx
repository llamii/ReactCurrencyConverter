import React, { FC } from 'react'
import { useStore } from 'effector-react'
import styles from './ConverterSelect.module.scss'
import arrowDown from '../../../assets/icons/arrow-down.svg'

import { openConverterList, $isOpenConverterList, closeConverterList } from '../../../store/ConverterList'

interface Props {
  currencyCode: string;
  ref: React.Ref<HTMLDivElement>
  onClick?: React.MouseEventHandler
}
const ConverterSelect: FC<Props> = (props) => {
  const { currencyCode, ref, onClick } = props
  const isOpenConverterList = useStore($isOpenConverterList)
  const handleClick = (event: React.MouseEvent) => {
    if (onClick) {
      onClick(event)
    }

    if (isOpenConverterList) {
      closeConverterList()
      return
    }
    openConverterList()
  }

  return (
    <div ref={ref} className={styles.select} onClick={handleClick}>
      <div className={styles.currency}>{currencyCode}</div>
      <div className={styles.arrow}>
        <img src={arrowDown} alt="arrow-down" />
      </div>
    </div>
  )
}
export default ConverterSelect
