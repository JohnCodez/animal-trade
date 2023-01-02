import { API_URL, HASURA_ADMIN_KEY } from '../constants/api.js'
import { ApolloClient, InMemoryCache, HttpLink } from 'apollo-client-preset';
import gql from 'graphql-tag';

const client = new ApolloClient({
  link: new HttpLink({ 
    uri: API_URL,
    headers: {
      'x-hasura-admin-secret': `${HASURA_ADMIN_KEY}`
    }
   }),
  cache: new InMemoryCache()
});

export function getBankSubscription({ uuid }) {
  const subscription = client.subscribe({
    query: gql`
      {
        user(where: { uuid: { _eq: "${uuid}" } }) {
          banks {
            gems
            coins
          }
        }
      }
    `,
  });
 
  return subscription;
}

export async function getBank({uuid}) {
  const result = await client.query({
    query: gql`{
        user(where: { uuid: { _eq: "${uuid}" } }) {
          banks {
            gems
            coins
          }
        }
      }
    `
  });
  return result.data.user[0].banks[0];
}

// Coins
export function setCoins({uuid, coinsInput, setBank}) {
  const client = new ApolloClient({
    link: new HttpLink({ 
      uri: API_URL,
      headers: {
        'x-hasura-admin-secret': `${HASURA_ADMIN_KEY}`
      }
    }),
    cache: new InMemoryCache()
  });
  client
    .mutate({
      mutation: gql`
        mutation UpdateCoins {
          update_bank(where: {users: {uuid: {_eq: "${uuid}"}}}, _set: {coins: ${coinsInput}}) {
            returning {
              gems
              coins
            }
          }
        }
      `
    })
    .then(result => {
      const updatedBank = result.data.update_bank.returning[0];
      if (setBank) {
        setBank(updatedBank);
      }
    })
    .catch(error => {
      console.error(error);
    });
}

// Gems
export function setGems({uuid, gemsInput, setBank}) {
  const client = new ApolloClient({
    link: new HttpLink({ 
      uri: API_URL,
      headers: {
        'x-hasura-admin-secret': `${HASURA_ADMIN_KEY}`
      }
    }),
    cache: new InMemoryCache()
  });
  client
    .mutate({
      mutation: gql`
        mutation UpdateGems {
          update_bank(where: {users: {uuid: {_eq: "${uuid}"}}}, _set: {gems: ${gemsInput}}) {
            returning {
              gems
              coins
            }
          }
        }
      `
    })
    .then(result => {
      const updatedBank = result.data.update_bank.returning[0];
      if (setBank) {
        setBank(updatedBank);
      }
    })
    .catch(error => {
      console.error(error);
    });
}
