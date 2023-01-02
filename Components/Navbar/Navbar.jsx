import { useContext, useEffect } from 'react'
import { useRouter } from 'next/router'
import { getBankSubscription } from '../../utils/bank'
import { BankContext, UuidContext } from '../../pages/_app'

import styles from './Navbar.module.css'

const Navbar = () => {
  const { push, asPath } = useRouter();

  const { bank, setBank } = useContext(BankContext);
  const { uuid, setUuid } = useContext(UuidContext);

	useEffect(() => {
    if (uuid) {
      const subscription = getBankSubscription({ uuid }).subscribe({
        next(result) {
          setBank(result.data.user[0].banks[0]);
        }
      });
      return () => subscription.unsubscribe();
    }
  }, [uuid]);

  return (
    <div className={styles.container}>
			<div className={styles.topbar}>
				<div className={styles.buttons}>
					{uuid ?
          <>
            <div className={styles.mainButtons}>
              <div className={`${styles.home} ${asPath === '/' && styles.selected}`} onClick={() => push('/')}>Home</div>
              <div className={`${styles.inventory} ${asPath === '/inventory' && styles.selected}`} onClick={() => push('/inventory')}>Inventory</div>
              <div className={`${styles.store} ${asPath === '/store' && styles.selected}`} onClick={() => push('/store')}>Store</div>
            </div>
            {bank &&
              <div className={styles.bank}>
                <div className={styles.coins}>Coins: {bank.coins}</div>
                <div className={styles.gems}>Gems: {bank.gems}</div>
              </div>
            }
            <div className={`${styles.account} ${asPath === '/account' && styles.selected}`} onClick={() => push('/account')}>Account</div> 
          </>
          : 
          <>
            <div className={`${styles.home} ${asPath === '/' && styles.selected}`} onClick={() => push('/')}>Home</div>
            <div className={`${asPath === '/login' && styles.selected}`} onClick={() => push('/login')}>Login</div>
          </>
        }
				</div>
			</div>
    </div>
  )
}

export default Navbar