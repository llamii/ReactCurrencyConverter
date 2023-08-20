import { useStore } from 'effector-react'
import { useRef } from 'react'
import ConverterSelect from './ConverterSelect/ConverterSelect'
import ConverterSwitch from './ConverterSwitch/ConverterSwitch'
import ConverterInput from './ConverterInput/ConverterInput'
import ConverterList from './ConverterList/ConverterList'

import { $isOpenConverterList, closeConverterList } from '../../store/ConverterList'
import { $currencyFrom, $currencyTo, selectClicked } from '../../store/store'
import styles from './Converter.module.scss'
import { WhichConverterListClicked } from '../../types/ConverterList'

const Converter = () => {
  const isOpen = useStore($isOpenConverterList)

  const currencyFrom = useStore($currencyFrom)
  const currencyTo = useStore($currencyTo)

  const selectRef = useRef<HTMLDivElement>(null)

  const onClose = () => {
    if (isOpen) {
      closeConverterList()
      selectClicked(null)
    }
  }
  return (
    <div className={styles.wrapper}>
      <div className={styles.left}>
        <ConverterSelect currencyCode={currencyFrom.code} ref={selectRef} onClick={() => selectClicked(WhichConverterListClicked.left)} />
        <ConverterInput />
      </div>
      <div className={styles.center}>
        <ConverterSwitch />
      </div>
      <div className={styles.right}>
        <ConverterSelect currencyCode={currencyTo.code} ref={selectRef} onClick={() => selectClicked(WhichConverterListClicked.right)} />
        <ConverterInput />
      </div>
      <ConverterList isOpen={isOpen} triggerRef={selectRef} onClose={onClose} />
    </div>
  )
}

export default Converter
