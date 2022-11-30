import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { getBank } from '../../utils/bank'

import styles from './Navbar.module.css'

const Navbar = () => {
  const { push, asPath } = useRouter();

	const [ uuid, setUuid] = useState(null)
	const [ bank, setBank ] = useState(null)

	useEffect(() => {
		if (typeof window !== 'undefined') {
			setUuid(localStorage.getItem('uuid'))
			if(localStorage.getItem('uuid')){
				getBank({uuid: localStorage.getItem('uuid'), setBank: setBank})
			}
		}
	}, [])

	useEffect(() => {
		if (typeof window !== 'undefined') {
			setUuid(localStorage.getItem('uuid'))
		}
	}, [asPath])

  return (
    <div className={styles.container}>
			<div className={styles.topbar}>
				<div className={styles.buttons}>
					<div className={`${styles.home} ${asPath === '/' && styles.selected}`} onClick={() => push('/')}>Home</div>
					{uuid ? <div className={asPath === '/account' && styles.selected} onClick={() => push('/account')}>Account</div> : <div className={asPath === '/login' && styles.selected} onClick={() => push('/login')}>Login</div>}
					<div className={`${styles.inventory} ${asPath === '/inventory' && styles.selected}`} onClick={() => push('/inventory')}>Inventory</div>
					<div className={asPath === '/store' && styles.selected} onClick={() => push('/store')}>Store</div>
				</div>
				{uuid && bank &&
					<div className={styles.bank}>
						<div className={styles.gems}>Gems: {bank.gems}</div>
						<div className={styles.coins}>Coins: {bank.coins}</div>
					</div>
				}
			</div>
    </div>
  )
}

export default Navbar