import React, {
  FC, useEffect, useRef, useState
} from 'react'

import { clsx } from 'clsx'
import axios from 'axios'
import { useStore } from 'effector-react'
import styles from './ConverterList.module.scss'
import { useOutsideClick } from '../../../hooks/useOutsideClick'

import {
  $currentSelectChosen, selectClicked, setCurrencyFrom, setCurrencyTo
} from '../../../store/store'
import { toggleConverterList, closeConverterList } from '../../../store/ConverterList'
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

  const getCurrencies = async () => {
    try {
      const response = await axios.get(
        'https://api.freecurrencyapi.com/v1/currencies?apikey=fca_live_lUzaqOGxL8WVddJg5kAf7ONla0Qf1GdNOb52uQhn&currencies='
      )
      if (response.data && response.data.data) {
        setCurrencies(Object.values(response.data.data))
      }
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e)
    }
  }

  useEffect(() => {
    getCurrencies()
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
