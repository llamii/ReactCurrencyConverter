import { FC } from 'react'
import {
  LineChart, XAxis, YAxis, Line, Tooltip, ResponsiveContainer
} from 'recharts'
import { clsx } from 'clsx'
import styles from './CurrencyChart.module.scss'

interface Props {
  isOpen: boolean;
}

const CurrencyChart:FC<Props> = (props) => {
  const { isOpen } = props

  const todayDate = new Date()
  const formattedDate = todayDate.toLocaleDateString('en-GB')

  const data = {
    '10.10.2001': {
      RUB: 96.04
    },
    '11.10.2001': {
      RUB: 99.55
    },
    '12.10.2001': {
      RUB: 99.55
    },
    '13.10.2001': {
      RUB: 98.5
    },
    '14.10.2001': {
      RUB: 95.99
    },
    '15.10.2001': {
      RUB: 98.00
    },
    '16.10.2001': {
      RUB: 96.36
    },
    '17.10.2001': {
      RUB: 94.25
    },
    '18.10.2001': {
      RUB: 93.02
    },
    '19.10.2001': {
      RUB: 93.02
    },
    '20.10.2001': {
      RUB: 92.98
    }
  }

  const dataArray = Object.entries(data).map(([date, currencies]) => ({
    name: date,
    Value: currencies.RUB
  }))

  return (
    <div className={clsx(styles.wrapper, isOpen && styles.show)}>
      <ResponsiveContainer className={styles.container} width={264} height={256}>
        <LineChart
          className={styles.chart}
          outerRadius={24}
          innerRadius={24}
          width={264}
          height={256}
          data={dataArray}
          margin={{
            top: 0,
            right: 0,
            left: -60,
            bottom: 0
          }}
        >
          {/* <CartesianGrid /> */}

          <XAxis dataKey="name" style={{ display: 'none' }} tick={false} tickCount={5} tickFormatter={(value, index) => (index % 2 === 0 ? value : '')} />
          <YAxis dataKey="value" style={{ display: 'none' }} domain={[90, 106]} />

          <Tooltip position={{ x: 112, y: 240 }} contentStyle={{ backgroundColor: 'transparent', border: 'none' }} />
          <Line
            type="monotone"
            dataKey="Value"
            stroke="#2D2E30"
          />

        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export { CurrencyChart }
