import React from 'react'

import classesStyles from '../../styles/classes.module.css'
import styles from './Modal.module.css'

const Modal = ({ text, primaryButtonText, primaryButtonOnClick, secondaryButtonText, secondaryButtonOnClick}) => {
  return (
    <div className={styles.container}>
      <div className={styles.modal}>
        <div className={styles.text}>{text}</div>
        <div className={`${styles.primaryButton} ${classesStyles.button}`} onClick={primaryButtonOnClick}>{primaryButtonText}</div>
        <div className={`${styles.secondaryButton} ${classesStyles.button}`} onClick={secondaryButtonOnClick}>{secondaryButtonText}</div>
      </div>
    </div>
  )
}

export default Modal