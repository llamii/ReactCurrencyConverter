import { FC } from 'react'

import { clsx } from 'clsx'
import { useStore } from 'effector-react'
import styles from './CurrencyList.module.scss'
import { $currencyTo, $currencyFrom } from '../../store/store'

interface Props {
  isOpen: boolean;
}

const CurrencyList:FC<Props> = (props) => {
  const { isOpen } = props
  const currencyTo = useStore($currencyTo)
  const currencyFrom = useStore($currencyFrom)

  return (
    <div className={clsx(styles.wrapper, isOpen && styles.show)}>
      <div className={styles.currencyTable}>
        <h3>
          {currencyFrom.code}
          {' '}
          to
          {' '}
          {currencyTo.code}
          :
        </h3>
        <table>
          <thead>
            <tr>
              <th>Amount</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {/* USD to EUR rows */}
            <tr>
              <td>1</td>
              <td>0.85</td>
            </tr>
            <tr>
              <td>2</td>
              <td>1.70</td>
            </tr>
            <tr>
              <td>1</td>
              <td>0.85</td>
            </tr>
            <tr>
              <td>2</td>
              <td>1.70</td>
            </tr>
            <tr>
              <td>1</td>
              <td>0.85</td>
            </tr>
            <tr>
              <td>2</td>
              <td>1.70</td>
            </tr>
            <tr>
              <td>1</td>
              <td>0.85</td>
            </tr>
            <tr>
              <td>2</td>
              <td>1.70</td>
            </tr>
            <tr>
              <td>2</td>
              <td>1.70</td>
            </tr>

            {/* Add more rows here */}
          </tbody>
        </table>
      </div>

      <div className={styles.currencyTable}>
        <h3>
          {currencyTo.code}
          {' '}
          to
          {' '}
          {currencyFrom.code}
          :
        </h3>
        <table>
          <thead>
            <tr>
              <th>Amount</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {/* EUR to USD rows */}
            <tr>
              <td>1</td>
              <td>0.85</td>
            </tr>
            <tr>
              <td>2</td>
              <td>1.70</td>
            </tr>
            <tr>
              <td>1</td>
              <td>0.85</td>
            </tr>
            <tr>
              <td>2</td>
              <td>1.70</td>
            </tr>
            <tr>
              <td>1</td>
              <td>0.85</td>
            </tr>
            <tr>
              <td>2</td>
              <td>1.70</td>
            </tr>
            <tr>
              <td>1</td>
              <td>0.85</td>
            </tr>
            <tr>
              <td>2</td>
              <td>1.70</td>
            </tr>
            <tr>
              <td>2</td>
              <td>1.70</td>
            </tr>
            {/* Add more rows here */}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export { CurrencyList }
