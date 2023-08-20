import React, { FC } from 'react'
import { useStore } from 'effector-react'
import styles from './ConverterSelect.module.scss'
import arrowDown from '../../../assets/icons/arrow-down.svg'

import { openConverterList, $isOpenConverterList, closeConverterList } from '../../../store/store'

interface Props {
  ref: React.Ref<HTMLDivElement>
}
const ConverterSelect: FC<Props> = (props) => {
  const { ref } = props
  const isOpenConverterList = useStore($isOpenConverterList)
  const handleClick = () => {
    if (isOpenConverterList) {
      closeConverterList()
      return
    }
    openConverterList()
  }

  return (
    <div ref={ref} className={styles.select} onClick={handleClick}>
      <div className={styles.currency}>RUB</div>
      <div className={styles.arrow}>
        <img src={arrowDown} alt="arrow-down" />
      </div>
    </div>
  )
}
export default ConverterSelect
