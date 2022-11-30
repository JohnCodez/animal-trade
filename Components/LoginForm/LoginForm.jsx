import React, { useEffect } from 'react'
import { useRouter } from 'next/router'

import { login } from '../../utils/api'
import styles from './LoginForm.module.css'

const LoginForm = () => {
  const { push } = useRouter();

  useEffect(() => {

  }, [])

  function handleSubmit(event) {
    event.preventDefault()
    const email = event.target[0].value
    const password = event.target[1].value
    login({ email: email, password: password, onSuccess: () => push('/account')})
  }
  return (
    <div className={styles.container}>
      <div className={styles.window}>
        <form onSubmit={(event) => handleSubmit(event)} className={styles.form}>
          <label className={styles.label} htmlFor='femail'>Email</label>
          <input className={styles.input} id='femail' name='femail' type='text' />
          <label className={styles.label} htmlFor='fPssword'>Password</label>
          <input className={styles.input} id='fPassword' name='fPassword' type='text' />
          <input className={styles.login} type="submit" value="Login➡"></input>
        </form>
        </div>
      </div>
  )
}

export default LoginForm