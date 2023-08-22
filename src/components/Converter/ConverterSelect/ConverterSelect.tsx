import React, { FC } from 'react'
import { useStore } from 'effector-react'
import { clsx } from 'clsx'
import styles from './ConverterSelect.module.scss'
import arrowDown from '../../../assets/icons/arrow-down.svg'

import { $isOpenConverterList } from '../../../store/display'
import { $currentSelectChosen } from '../../../store/store'
import { Position } from '../../../types/Position'

interface Props {
  position: Position
  currencyCode: string;
  ref: React.Ref<HTMLDivElement>
  onClick?: React.MouseEventHandler
}
const ConverterSelect: FC<Props> = (props) => {
  const {
    position, currencyCode, ref, onClick
  } = props
  const isOpenConverterList = useStore($isOpenConverterList)
  const currentSelectChosen = useStore($currentSelectChosen)
  const isSelected = () =>
    (isOpenConverterList && currentSelectChosen === position)

  return (
    <div ref={ref} className={clsx(styles.select, isSelected() && styles.selected)} onClick={onClick}>
      <div className={styles.currency}>{currencyCode}</div>
      <div className={styles.arrow}>
        <img src={arrowDown} alt="arrow-down" />
      </div>
    </div>
  )
}
export default ConverterSelect
