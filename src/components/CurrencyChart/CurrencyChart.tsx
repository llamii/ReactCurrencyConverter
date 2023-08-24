import React, { FC } from 'react';
import {
  LineChart, XAxis, YAxis, Line, Tooltip, ResponsiveContainer
} from 'recharts';
import { clsx } from 'clsx';
import styles from './CurrencyChart.module.scss';
import { CurrencyHistory } from '../../types/CurrencyHistory';

interface Props {
  isOpen: boolean;
  data: CurrencyHistory[];
}

const CurrencyChart: FC<Props> = (props) => {
  const { isOpen, data } = props;

  const minValue = Math.min(...data.map(item => item.value));
  const maxValue = Math.max(...data.map(item => item.value));
  const padding = 0.3 * (maxValue - minValue);
  return (
    <div className={clsx(styles.wrapper, isOpen && styles.show)}>
      <ResponsiveContainer className={styles.container} width={264} height={256}>
        <LineChart
          className={styles.chart}
          outerRadius={24}
          innerRadius={24}
          width={264}
          height={256}
          data={data}
          margin={{
            top: 0,
            right: 0,
            left: -60,
            bottom: 0
          }}
        >

          <XAxis dataKey="date" style={{ display: 'none' }} tick={false} tickCount={5} tickFormatter={(value, index) => (index % 2 === 0 ? value : '')} />


          <YAxis
            dataKey="value"
            style={{ display: 'none' }}
            scale="log"
            domain={[minValue - padding, maxValue + padding]}
            allowDataOverflow
          />


          <Tooltip position={{ x: 80, y: 240 }} contentStyle={{ backgroundColor: 'transparent', border: 'none' }} />
          <Line type="monotone" dataKey="value" stroke="#58a1b7" />

        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export { CurrencyChart };
