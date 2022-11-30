import { useState } from 'react'
import Card from '../Components/Card'
import Modal from '../Components/Modal';
import PackCarousel from '../Components/PackCarousel';
import { rollPack } from '../utils/packs'
import { addCurrency } from '../utils/bank'

import classesStyles from '../styles/classes.module.css'
import styles from '../styles/Store.module.css'

const store = () => {

  const [ hasInefficientCurrencyError, setHasInefficientCurrencyError ] = useState(false)
  const [ isPackCarouselActive, setIsPackCarouselActive ] = useState(false)

  function handleRollPack({ type, errorCallback }) {
    // setIsPackCarouselActive(true)
    rollPack({type: type, errorCallback: errorCallback})
  }

  return (
    <>
      {isPackCarouselActive && <PackCarousel />}
      {hasInefficientCurrencyError &&
        <Modal 
          text='Inefficient currency'
          primaryButtonText='Add currecy'
          primaryButtonOnClick={() => {addCurrency()}}
          secondaryButtonText='Close'
          secondaryButtonOnClick={() => {setHasInefficientCurrencyError(false)}}
        />
      }
      <div className={styles.container}>
        <Card cardWidth={400}>
          <div className={styles.label}>Farm Pack</div>
          <div
            className={`${styles.button} ${classesStyles.button}`}
            onClick={() => handleRollPack({ type: 'farm', errorCallback: () => setHasInefficientCurrencyError(true) })}
          >100 Coins</div>
        </Card>
        <Card cardWidth={400}>
          <div className={styles.label}>Sea Pack</div>
          <div 
            className={`${styles.button} ${classesStyles.button}`}
            onClick={() => handleRollPack({ type: 'sea', errorCallback: () => setHasInefficientCurrencyError(true) })}
          >1 Gem</div>
        </Card>
      </div>
    </>
  )
}

export default store