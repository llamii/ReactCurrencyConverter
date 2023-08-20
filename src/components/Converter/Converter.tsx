import { useStore } from 'effector-react'
import { useRef } from 'react'
import ConverterSelect from './ConverterSelect/ConverterSelect'
import ConverterSwitch from './ConverterSwitch/ConverterSwitch'
import ConverterInput from './ConverterInput/ConverterInput'
import ConverterList from './ConverterList/ConverterList'

import { $isOpenConverterList, closeConverterList } from '../../store/store'
import styles from './Converter.module.scss'

const Converter = () => {
  const isOpen = useStore($isOpenConverterList)
  const selectRef = useRef<HTMLDivElement>(null)

  const onClose = () => {
    if (isOpen) {
      closeConverterList()
    }
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.left}>
        <ConverterSelect ref={selectRef} />
        <ConverterInput />
      </div>
      <div className={styles.center}>
        <ConverterSwitch />
      </div>
      <div className={styles.right}>
        <ConverterSelect ref={selectRef} />
        <ConverterInput />
      </div>
      <ConverterList isOpen={isOpen} triggerRef={selectRef} onClose={onClose} />
    </div>
  )
}

export default Converter
