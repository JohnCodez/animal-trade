import React from 'react'

import Card from '../Components/Card'
import CardBrowser from '../Components/CardBrowser'
import { getInventory } from '../utils/inventory.js'

import styles from '../styles/Inventory.module.css'

const inventory = () => {

  const currentUnits = getInventory()

  function renderCards() {
		return currentUnits.map(unit => {
			return <Card>{unit.name} {unit.count > 1 && `x${unit.count}`}</Card>
		})
	}

  return (
    <div className={styles.cardBrowserWrapper}>
      <CardBrowser>
        {currentUnits && currentUnits.length > 0 ?
          renderCards()
          : <div>Inventory is empty</div>
        }
      </CardBrowser>
    </div>
  )
}

export default inventory