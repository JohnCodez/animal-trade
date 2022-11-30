import React from 'react'
import styles from './Card.module.css'

const Card = ({
  children,
  className = null,
  cardWidth = 150,
  isCustom = false,
  onClick = null,
}) => {
  return (

    <div 
      style={{'--cardWidth': `${cardWidth}px`, '--cardHeight': `${cardWidth*1.3}px`, '--fontSize': `${cardWidth/10}px`}}
      className={`
        ${styles.container}
        ${className && className}
        ${isCustom && styles.custom}
        ${onClick && styles.clickable}
      `}
      onClick={onClick}
    >
      {children}
    </div>
  )
}

export default Card