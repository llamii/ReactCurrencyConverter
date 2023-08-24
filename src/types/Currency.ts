export type Currency = {
  symbol: string;
  name: string;
  symbol_native: string;
  decimal_digits: number;
  rounding: number;
  code: string;
  name_plural: string;
}

export const initialCurrencyFrom:Currency = {
  symbol: '$',
  name: 'US Dollar',
  symbol_native: '$',
  decimal_digits: 2,
  rounding: 0,
  code: 'USD',
  name_plural: 'US dollars'
}

export const initialCurrencyTo:Currency = {
  symbol: 'RUB',
  name: 'Russian Ruble',
  symbol_native: 'руб.',
  decimal_digits: 2,
  rounding: 0,
  code: 'RUB',
  name_plural: 'Russian rubles'
}

export const popularCodes = [
  'RUB',
  'EUR',
  'USD',
  'GBP'
]
