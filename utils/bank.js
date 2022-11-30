import { API_URL, HASURA_ADMIN_KEY } from '../constants/api.js'

export function getBank({uuid, setBank}) {
  const query = `
      {
        user(where: {uuid: {_eq: "${uuid}"}}) {
          banks {
            gems
            coins
          }
        }
      }
    `

  fetch(API_URL, {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      'x-hasura-admin-secret': `${HASURA_ADMIN_KEY}`
    },
    body: JSON.stringify({
      query: query
    })
  }).then(data => data.json())
  .then(data => {
    const bank = data.data.user[0].banks[0]
    setBank(bank)
  })
}

// Coins
export function addCoins(coinsInput) {
  bank.coins += coinsInput
  return bank.coins
}

export function decreaseCoins(coinsInput) {
  bank.coins -= coinsInput
  return bank.coins
}

export function setCoins(coinsInput) {
  bank.coins = coinsInput
  return bank.coins
}

// Gems
export function addGems(gemsInput) {
  bank.gems += gemsInput
  return bank.gems
}

export function decreaseGems(gemsInput) {
  bank.gems -= gemsInput
  return bank.gems
}

export function setGems(gemsInput) {
  bank.gems = gemsInput
  return bank.gems
}

// both

export function addCurrency() {
  bank.coins = 900
  bank.gems = 10
}