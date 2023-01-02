import React, { useEffect, useContext } from 'react'
import { useRouter } from 'next/router'

import { UuidContext } from '../../pages/_app'
import { login } from '../../utils/api'
import styles from './LoginForm.module.css'

const LoginForm = () => {
  const { push } = useRouter();
  const { uuid, setUuid } = useContext(UuidContext);

  function handleSubmit(event) {
    event.preventDefault()
    const femail = event.target[0].value
    const fpassword = event.target[1].value
    login({ email: femail, password: fpassword, onSuccess: () => push('/account'), setUuid})
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