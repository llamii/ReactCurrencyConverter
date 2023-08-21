import { FC } from 'react'
import {
  LineChart, XAxis, YAxis, CartesianGrid, Line, Tooltip, Legend
} from 'recharts'

interface Props {
}

const CurrencyChart:FC<Props> = (props) => {
  const {} = props

  const todayDate = new Date()
  const formattedDate = todayDate.toLocaleDateString('en-GB')

  const data = {
    10: {
      RUB: 96.0485684993
    },
    11: {
      RUB: 99.5564450298
    },
    12: {
      RUB: 99.5564417617
    },
    13: {
      RUB: 98.532637627
    },
    14: {
      RUB: 95.9903962843
    },
    15: {
      RUB: 98.0001841698
    },
    16: {
      RUB: 96.3677709801
    },
    17: {
      RUB: 94.2582236422
    },
    18: {
      RUB: 93.0226329924
    },
    19: {
      RUB: 93.0226295082
    },
    20: {
      RUB: 92.9890620398
    }
  }

  const dataArray = Object.entries(data).map(([date, currencies]) => ({
    name: date,
    value: currencies.RUB
  }))
  console.log(dataArray)
  return (
    <div>
      <LineChart
        width={512}
        height={256}
        data={dataArray}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis dataKey="value" domain={[0, 120]} />
        <Tooltip />
        <Line
          type="monotone"
          dataKey="value"
          stroke="#8884d8"
          activeDot={{ r: 8 }}
        />
      </LineChart>
    </div>
  )
}

export { CurrencyChart }
