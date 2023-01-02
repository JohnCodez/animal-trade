import React, { useEffect, useContext, useState } from 'react'
import { useRouter } from 'next/router'
import { UuidContext } from './_app'

import styles from '../styles/Account.module.css'
import { getAccount } from '../utils/api'

const account = () => {
  const { push } = useRouter();
  const { uuid, setUuid } = useContext(UuidContext)
	const [ account, setAccount ] = useState(null)

	useEffect(() => {
    if(!uuid){
      push('/login')
    } else {
      getAccount({uuid, setAccount})
    }
	}, [])

  function handleLogout() {
    setUuid(null)
    localStorage.clear()
    push('/login')
  }

  return (
    <div className={styles.container}>
      <div className={styles.window}>
        <div className={styles.title}>Account</div>
        {account && <>
          <div className={styles.username}>Username: {account.username}</div>
          <div className={styles.email}>Email: {account.email}</div>
        </>}
        <div onClick={handleLogout} className={styles.logout}>Logout</div>
      </div>
    </div>
  )
}

export default account