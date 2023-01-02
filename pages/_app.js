import { createContext, useState, useEffect } from 'react';

import Navbar from '../Components/Navbar'
import '../styles/globals.css'

const BankContext = createContext();
const UuidContext = createContext();

function Providers({children}) {
  const [ bank, setBank ] = useState(null);
  const [ uuid, setUuid] = useState(null)

  useEffect(() => {
    if (typeof window !== 'undefined') {
			setUuid(localStorage.getItem('uuid'))
    }
  }, [])

  return (
    <BankContext.Provider value={{ bank, setBank }}>
      <UuidContext.Provider value={{ uuid, setUuid }}>
        {children}
      </UuidContext.Provider>
    </BankContext.Provider>
  )
}

function MyApp({ Component, pageProps }) {
  return (
    <Providers>
      <Navbar />
      <Component {...pageProps} />
    </Providers>
  )
}
export { BankContext, UuidContext }
export default MyApp
