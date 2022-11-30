import { API_URL, HASURA_ADMIN_KEY } from '../constants/api.js'

export function fetchAPI({query}){
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
  .then(data => {console.log(data.data)})
}

export function login({email, password, onSuccess}) {
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
  }).then(data => data.json())
  .then(data => {
    const user = data.data.user[0]
    localStorage.setItem('username', user.username)
    localStorage.setItem('uuid', user.uuid)
    localStorage.setItem('email', user.email)
    onSuccess()
  })
}