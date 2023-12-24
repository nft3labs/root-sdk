import { Outlet } from 'react-router-dom'
import { useROOT } from '@rootlabs/did-manager'

import styles from './style.module.scss'

export default function Home() {
  const { identifier } = useROOT()

  if (!identifier) {
    return <div className={styles.tip}>Please login first</div>
  }

  return <Outlet />
}
