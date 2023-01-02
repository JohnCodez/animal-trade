import { API_URL, HASURA_ADMIN_KEY } from '../constants/api.js'

export function login({email, password, onSuccess, setUuid}) {
  const query = `
      {
        user(where: {email: {_eq: "${email}"}, _and: {password: {_eq: "${password}"}}}) {
          uuid
          username
          email
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
  })
  .then(data => data.json())
  .then(data => {
    const { uuid } = data.data.user[0]
    setUuid(uuid)
    localStorage.setItem('uuid', uuid)
    onSuccess()
  })
}

export function getAccount({uuid, setAccount}) {
  const query = `
    {
      user(where: {uuid: {_eq: "${uuid}"}}) {
        email
        username
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
  })
  .then(data => data.json())
  .then(data => {
    setAccount(data.data.user[0])
  })
}