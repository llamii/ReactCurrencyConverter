import { FC } from 'react'
import { useStore } from 'effector-react'
import styles from './Settings.module.scss'
import { Toggle } from './Toggle/Toggle'

import {
  $isCurrencyChartOpen, $isCurrencyListOpen, toggleCurrencyChart, toggleCurrencyList
} from '../../store/display'

interface Props {

}
const Settings: FC<Props> = () => {
  const isCurrencyChartOpen = useStore($isCurrencyChartOpen)
  const isCurrencyListOpen = useStore($isCurrencyListOpen)
  return (
    <div className={styles.wrapper}>
      <div className={styles.list}>
        <span>List</span>
        <Toggle checked={isCurrencyListOpen} onChange={() => toggleCurrencyList()} />
      </div>
      <div className={styles.chart}>
        <span>Chart</span>
        <Toggle checked={isCurrencyChartOpen} onChange={() => toggleCurrencyChart()} />
      </div>
    </div>
  )
}

export { Settings }
