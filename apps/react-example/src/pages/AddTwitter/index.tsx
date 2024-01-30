import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Button, Input, Message } from '@arco-design/web-react'

import styles from './style.module.scss'
import useSocial from '@hooks/useSocial'

export default function AddTwitter() {
  const { account } = useParams()
  const navigate = useNavigate()
  const [link, setLink] = useState('')
  const [loading, setLoading] = useState(false)
  const { requestTwitter, verifyTwitter, addTwitter } = useSocial()
  const [info, setInfo] = useState<{
    link: string
    text: string
    msghash: string
  }>()

  const request = () => {
    const info = requestTwitter()
    setInfo(info)
    Message.success('Load successfully')
  }

  const verify = async () => {
    try {
      if (!info || !link) return
      setLoading(true)
      const verify = await verifyTwitter(account!, info!.msghash, link)
      if (verify.result === false) {
        return Message.error('Verify failed')
      }
      await addTwitter({
        account: account!,
        type: 'twitter',
        proof: verify.proof,
        verifier_key: verify.verifier_key,
        msghash: info!.msghash
      })
      setInfo(undefined)
      navigate('/home/socials')
      Message.success('Account added')
    } catch (error: any) {
      Message.error(error.message || 'Verify failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles.wrap}>
      <div className={styles.title}>Add Twitter</div>
      <div className={styles.main}>
        <div className={styles.card}>
          <div className={styles.cardMain}>
            <div className={styles.cardTitle}>Step 1</div>
            <div className={styles.cardText}>
              Click this button to load the attestation challenge.
            </div>
          </div>
          <div className={styles.cardBtn}>
            <Button type="primary" onClick={request}>
              Load
            </Button>
          </div>
        </div>
        <div className={styles.card}>
          <div className={styles.cardMain}>
            <div className={styles.cardTitle}>Step 2</div>
            <div className={styles.cardText}>
              Tweet a verification from
              <span className={styles.red}>{account}</span>
            </div>
          </div>
          <div className={styles.cardBtn}>
            <Button
              type="primary"
              onClick={() => window.open(info?.link)}
              disabled={!info}
            >
              Open
            </Button>
          </div>
        </div>
        <div className={styles.card}>
          <div className={styles.cardMain}>
            <div className={styles.cardTitle}>Step 3</div>
            <div className={styles.cardText}>
              Fill in the link of the tweet and verify your account by clicking
              the verify button.
            </div>
            <div className={styles.cardInput}>
              <Input.Search
                searchButton="Verify"
                style={{ maxWidth: '500px' }}
                loading={loading}
                value={link}
                disabled={!info}
                onChange={value => setLink(value)}
                onSearch={verify}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
