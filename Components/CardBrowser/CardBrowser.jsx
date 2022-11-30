import React from 'react'
import styles from './CardBrowser.module.css'

const CardBrowser = ({
  children,
  windowWidth = '50vw',
  windowHeight = '75vh'
}) => {
  return (
    <div 
      style={{'--windowWidth': windowWidth, '--windowHeight': windowHeight}}
      className={styles.container}
    >
      {children}
    </div>
  )
}

export default CardBrowser