import { useState, useContext } from 'react'
import Card from '../Components/Card'
import Modal from '../Components/Modal';
import PackCarousel from '../Components/PackCarousel';
import { rollPack, packs } from '../utils/packs'
import { addCurrency } from '../utils/bank'
import { BankContext, UuidContext } from './_app'

import classesStyles from '../styles/classes.module.css'
import styles from '../styles/Store.module.css'

const store = () => {

  const [ hasInefficientCurrencyError, setHasInefficientCurrencyError ] = useState(false)
  const [ isPackCarouselActive, setIsPackCarouselActive ] = useState(false)
  const { bank, setBank } = useContext(BankContext);
  const { uuid, setUuid } = useContext(UuidContext)

  function handleRollPack({ type, errorCallback }) {
    // setIsPackCarouselActive(true)
    rollPack({type: type, errorCallback: errorCallback, uuid, bank, setBank})
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
        {Object.keys(packs).map(key => {
          const pack = packs[key]
          return <Card cardWidth={400}>
            <div className={styles.name}>{pack.name}</div>
            <div
              className={`${styles.button} ${classesStyles.button}`}
              onClick={() => handleRollPack({ type: pack.type, errorCallback: () => setHasInefficientCurrencyError(true) })}
            >{pack.cost} {pack.currencyType}</div>
          </Card>
        })}
      </div>
    </>
  )
}

export default store