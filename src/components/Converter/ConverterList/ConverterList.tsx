import React, { FC, useRef } from 'react'

import { clsx } from 'clsx'
import styles from './ConverterList.module.scss'
import { useOutsideClick } from '../../../hooks/useOutsideClick'

interface Props {
  isOpen: boolean;
  onClose: () => void;
  triggerRef?: React.RefObject<HTMLElement>;
}
const ConverterList: FC<Props> = (props) => {
  const { isOpen, triggerRef, onClose } = props

  const converterListRef = useRef<HTMLDivElement>(null)

  useOutsideClick({
    elementRef: converterListRef,
    triggerRef,
    onOutsideClick: onClose,
    enabled: isOpen
  })

  if (!isOpen) return null

  return (
    <div ref={converterListRef} className={styles.wrapper}>
      <ul className={clsx(styles.list, styles.first)}>
        <li>
          <span className={styles.plural}>US dollars</span>
          <span className={styles.code}>USD</span>
        </li>
        <li>
          <span className={styles.plural}>Russian rubles</span>
          <span className={styles.code}>RUR</span>
        </li>
        <li>
          <span className={styles.plural}>US dollars</span>
          <span className={styles.code}>USD</span>
        </li>
        <li>
          <span className={styles.plural}>Russian rubles</span>
          <span className={styles.code}>RUR</span>
        </li>
        <li>
          <span className={styles.plural}>US dollars</span>
          <span className={styles.code}>USD</span>
        </li>
        <li>
          <span className={styles.plural}>Russian rubles</span>
          <span className={styles.code}>RUR</span>
        </li>
        <li>
          <span className={styles.plural}>US dollars</span>
          <span className={styles.code}>USD</span>
        </li>
        <li>
          <span className={styles.plural}>Russian rubles</span>
          <span className={styles.code}>RUR</span>
        </li>
        <li>
          <span className={styles.plural}>US dollars</span>
          <span className={styles.code}>USD</span>
        </li>
        <li>
          <span className={styles.plural}>Russian rubles</span>
          <span className={styles.code}>RUR</span>
        </li>
        <li>
          <span className={styles.plural}>US dollars</span>
          <span className={styles.code}>USD</span>
        </li>
      </ul>

      <ul className={clsx(styles.list, styles.second)}>
        <li>
          <span className={styles.plural}>US dollars</span>
          <span className={styles.code}>USD</span>
        </li>
        <li>
          <span className={styles.plural}>Russian rubles</span>
          <span className={styles.code}>RUR</span>
        </li>
        <li>
          <span className={styles.plural}>US dollars</span>
          <span className={styles.code}>USD</span>
        </li>
        <li>
          <span className={styles.plural}>Russian rubles</span>
          <span className={styles.code}>RUR</span>
        </li>
        <li>
          <span className={styles.plural}>US dollars</span>
          <span className={styles.code}>USD</span>
        </li>
        <li>
          <span className={styles.plural}>Russian rubles</span>
          <span className={styles.code}>RUR</span>
        </li>
        <li>
          <span className={styles.plural}>US dollars</span>
          <span className={styles.code}>USD</span>
        </li>
        <li>
          <span className={styles.plural}>Russian rubles</span>
          <span className={styles.code}>RUR</span>
        </li>
        <li>
          <span className={styles.plural}>US dollars</span>
          <span className={styles.code}>USD</span>
        </li>
        <li>
          <span className={styles.plural}>Russian rubles</span>
          <span className={styles.code}>RUR</span>
        </li>
        <li>
          <span className={styles.plural}>US dollars</span>
          <span className={styles.code}>USD</span>
        </li>
      </ul>

      <ul className={clsx(styles.list, styles.third)}>
        <li>
          <span className={styles.plural}>US dollars</span>
          <span className={styles.code}>USD</span>
        </li>
        <li>
          <span className={styles.plural}>Russian rubles</span>
          <span className={styles.code}>RUR</span>
        </li>
        <li>
          <span className={styles.plural}>US dollars</span>
          <span className={styles.code}>USD</span>
        </li>
        <li>
          <span className={styles.plural}>Russian rubles</span>
          <span className={styles.code}>RUR</span>
        </li>
        <li>
          <span className={styles.plural}>US dollars</span>
          <span className={styles.code}>USD</span>
        </li>
        <li>
          <span className={styles.plural}>Russian rubles</span>
          <span className={styles.code}>RUR</span>
        </li>
        <li>
          <span className={styles.plural}>US dollars</span>
          <span className={styles.code}>USD</span>
        </li>
        <li>
          <span className={styles.plural}>Russian rubles</span>
          <span className={styles.code}>RUR</span>
        </li>
        <li>
          <span className={styles.plural}>US dollars</span>
          <span className={styles.code}>USD</span>
        </li>
        <li>
          <span className={styles.plural}>Russian rubles</span>
          <span className={styles.code}>RUR</span>
        </li>
        <li>
          <span className={styles.plural}>US dollars</span>
          <span className={styles.code}>USD</span>
        </li>
      </ul>
    </div>
  )
}

export default ConverterList
