import React, { useEffect } from 'react'
import LoginForm from '../Components/LoginForm/LoginForm'

const login = () => {

  useEffect(() => {
		if (typeof window !== 'undefined') {
      if(localStorage.getItem('uuid')){
        push('/account')
      }
		}
	}, [])

  return (
    <div>
      <LoginForm />
    </div>
  )
}

export default login