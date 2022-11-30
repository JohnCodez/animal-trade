import { getInventory, setInventory } from './inventory.js'
import { decreaseCoins, decreaseGems, getBank } from '../utils/bank.js';

export const packs = {
  farm: {
    currencyType: 'coins',
    cost: 100,
    contents: [
      {type: 'horse', name: 'Horse'},
      {type: 'cow', name: 'Cow'},
      {type: 'pig', name: 'Pig'},
      {type: 'chicken', name: 'Chicken'},
    ],
  },
  sea: {
    currencyType: 'gems',
    cost: 1,
    contents: [
      {type: 'stingray', name: 'Stingray'},
      {type: 'jellyfish', name: 'Jellyfish'},
      {type: 'greatWhiteShark', name: 'Great White Shark'},
      {type: 'starfish', name: 'Starfish'},
    ],
  },
}

export function getRandomUnit({type}){
  const randomNumber = Math.floor(Math.random() * packs[type].contents.length);
  return packs[type].contents[randomNumber]
}

export function addNewUnit({ type, quantity = 1}) {
  for(let i = 0; i < quantity; i++){
    const newUnit = getRandomUnit({type: type})
    const newUnits = getInventory()
    const duplicateUnitIndex = newUnits.findIndex(unit => newUnit.type === unit.type)

    if(duplicateUnitIndex === -1) {
      newUnit.count = 1
      newUnits.unshift(newUnit)
    } else {
      newUnits[duplicateUnitIndex].count += 1
      newUnits[duplicateUnitIndex]
    }

    setInventory(newUnits)
  }
}

export function rollPack({ type, quantity = 1, errorCallback = () => {}}) {
  const bank = getBank()
  if(packs[type].currencyType === 'coins' && packs[type].cost <= bank.coins) {
    decreaseCoins(packs[type].cost)
    addNewUnit({ type, quantity })
  } else if (packs[type].currencyType === 'gems' && packs[type].cost <= bank.gems) {
    decreaseGems(packs[type].cost)
    addNewUnit({ type, quantity })
  } else {
    errorCallback()
  }
}