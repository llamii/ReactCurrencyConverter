import React, { FC } from 'react';
import { clsx } from 'clsx';
import { useStore } from 'effector-react';
import styles from './CurrencyList.module.scss';
import { $currencyTo, $currencyFrom, $exchangeRate} from '../../store/store';

interface Props {
  isOpen: boolean;
}

const generateRows = (amounts: number[], exchangeRate: number, isReverse: boolean) => {
  return amounts.map((amount) => (
    <tr key={amount}>
      <td>{amount}</td>
      <td>{(isReverse ? amount / exchangeRate : amount * exchangeRate).toFixed(2)}</td>
    </tr>
  ));
};

const CurrencyList: FC<Props> = (props) => {
  const { isOpen } = props;
  const currencyTo = useStore($currencyTo);
  const currencyFrom = useStore($currencyFrom);
  const exchangeRate = useStore($exchangeRate)
  const amounts = [1, 5, 10, 25, 50, 100, 500, 1000, 5000];

  const fromToRows = generateRows(amounts, exchangeRate, false);
  const toFromRows = generateRows(amounts, exchangeRate, true);

  return (
    <div className={clsx(styles.wrapper, isOpen && styles.show)}>
      <div className={styles.currencyTable}>
        <h3>
          {currencyFrom.code} to {currencyTo.code}:
        </h3>
        <table>
          <thead>
          <tr>
            <th>Amount</th>
            <th>Price</th>
          </tr>
          </thead>
          <tbody>{fromToRows}</tbody>
        </table>
      </div>

      <div className={styles.currencyTable}>
        <h3>
          {currencyTo.code} to {currencyFrom.code}:
        </h3>
        <table>
          <thead>
          <tr>
            <th>Amount</th>
            <th>Price</th>
          </tr>
          </thead>
          <tbody>{toFromRows}</tbody>
        </table>
      </div>
    </div>
  );
};


export { CurrencyList };
