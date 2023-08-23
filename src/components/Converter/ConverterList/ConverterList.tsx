import React, {
  FC, useEffect, useRef, useState
} from 'react'

import { clsx } from 'clsx'

import { useStore } from 'effector-react'
import styles from './ConverterList.module.scss'
import { useOutsideClick } from '../../../hooks/useOutsideClick'

import { fetchCurrencies } from '../../../api/converter_api'
import {
  $currentSelectChosen, selectClicked, setCurrencyFrom, setCurrencyTo
} from '../../../store/store'
import { closeConverterList } from '../../../store/display'
import { Currency } from '../../../types/Currency'
import { Position } from '../../../types/Position'

interface Props {
  opened: boolean;
  triggerRef?: React.RefObject<HTMLElement>;
  onClose: () => void;
}

const ConverterList: FC<Props> = (props) => {
  const { opened, triggerRef, onClose } = props

  const [currencies, setCurrencies] = useState<Currency[]>([])

  const currentSelectChoosen = useStore($currentSelectChosen)

  const converterListRef = useRef<HTMLDivElement>(null)

  useOutsideClick({
    elementRef: converterListRef,
    triggerRef,
    onOutsideClick: onClose,
    enabled: opened
  })

  const handleItemClick = (currency: Currency) => {
    switch (currentSelectChoosen) {
      case Position.left:
        setCurrencyFrom(currency)
        break
      case Position.right:
        setCurrencyTo(currency)
        break
      default:
    }
    selectClicked(null)
    closeConverterList()
  }

  useEffect(() => {
    fetchCurrencies([])
      .then((res) => setCurrencies(res))
      .catch((e) => console.error(e))
  }, [])

  const renderLists = () => {
    const chunkSize = Math.ceil(currencies.length / 3)

    return (
      <>
        {Array.from({ length: 3 }).map((_, columnIndex) => (
          <ul key={columnIndex} className={clsx(styles.list, styles[`list${columnIndex + 1}`])}>
            {currencies.slice(columnIndex * chunkSize, (columnIndex + 1) * chunkSize).map((currency) => (
              <li key={currency.code} onClick={() => handleItemClick(currency)}>
                <span className={styles.plural}>{currency.name_plural}</span>
                <span className={styles.code}>{currency.code}</span>
              </li>
            ))}
          </ul>
        ))}
      </>
    )
  }

  if (!opened) return null

  return (
    <div ref={converterListRef} className={styles.wrapper}>
      {renderLists()}
    </div>
  )
}

export default ConverterList
