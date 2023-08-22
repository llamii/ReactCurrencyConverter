import arrowExchange from '../../../assets/icons/arrow-exchange.svg'

import styles from './ConverterSwitch.module.scss'
import { switchButtonClicked } from '../../../store/store'

const ConverterSwitch = () => (
  <img className={styles.exchange} src={arrowExchange} alt="exchange" onClick={() => switchButtonClicked()} />
)

export default ConverterSwitch
