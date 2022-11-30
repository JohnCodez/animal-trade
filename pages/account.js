import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

import styles from '../styles/Account.module.css'

const account = () => {
  const { push, asPath } = useRouter();
  const [ username, setUsername ] = useState(null)
	const [ email, setEmail] = useState(null)

	useEffect(() => {
		if (typeof window !== 'undefined') {
			setUsername(localStorage.getItem('username'))
			setEmail(localStorage.getItem('email'))
      if(!localStorage.getItem('uuid')){
        push('/login')
      }
		}
	}, [])

  function handleLogout() {
    localStorage.clear()
    push('/login')
  }

  return (
    <div className={styles.container}>
      <div className={styles.window}>
        <div className={styles.title}>Account</div>
        <div className={styles.username}>Username: {username}</div>
        <div className={styles.email}>Email: {email}</div>
        <div onClick={handleLogout} className={styles.logout}>Logout</div>
      </div>
    </div>
  )
}

export default account