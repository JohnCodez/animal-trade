import React, { useEffect, useContext } from 'react'
import { useRouter } from 'next/router'
import LoginForm from '../Components/LoginForm'
import { UuidContext } from './_app'

const login = () => {
  const { push } = useRouter();
  const { uuid, setUuid } = useContext(UuidContext);

  useEffect(() => {
    if(uuid){
      push('/account')
    }
	}, [])

  return <LoginForm />
}

export default login