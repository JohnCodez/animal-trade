import { getInventory, setInventory } from './inventory.js'
import { setGems, getBank, setCoins } from '../utils/bank.js';

export const packs = {
  farm: {
    name: 'Farm Pack',
    type: 'farm',
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
    name: 'Sea Pack',
    type: 'sea',
    currencyType: 'gems',
    cost: 10,
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

export async function rollPack({ type, quantity = 1, errorCallback = () => {}, uuid, bank, setBank}) {
  if(bank){
    if(packs[type].currencyType === 'coins' && packs[type].cost <= bank.coins) {
      setCoins({uuid: uuid, coinsInput: bank.coins - packs[type].cost, setBank})
      addNewUnit({ type, quantity })
    } else if (packs[type].currencyType === 'gems' && packs[type].cost <= bank.gems) {
      setGems({uuid: uuid, gemsInput: bank.gems - packs[type].cost, setBank})
      addNewUnit({ type, quantity })
    } else {
      errorCallback()
    }
  } else {
    console.error('Failed to retrive bank data')
  }
}