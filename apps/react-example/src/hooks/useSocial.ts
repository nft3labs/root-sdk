import { useState, useCallback, useMemo } from 'react'
import { useROOT } from '@rootlabs/did-manager'
import { ROOTVerifier, SocialAccountModel, WithMeta } from '@rootlabs/client'

export interface SocialRecord extends WithMeta<SocialAccountModel> {
  verified: boolean
}

export default function useSocial() {
  const { client } = useROOT()
  const [socials, setSocials] = useState<SocialRecord[]>([])

  const verifier = useMemo(() => {
    return new ROOTVerifier(client, 'https://t0.onebitdev.com/nft3-verifier/')
  }, [client])

  const list = useCallback(
    async (identifier?: string) => {
      identifier = identifier || client.did.identifier
      if (!identifier) return
      const items = await client.socialAccount.list(identifier)
      const rows: SocialRecord[] = items.map(item => ({
        ...item,
        verified: verifier.verifyProof({
          did: identifier || '',
          account: item.account,
          type: item.type,
          proof: item.proof,
          verifier_key: item.verifier_key
        })
      }))
      setSocials(rows)
    },
    [client.did.identifier, client.socialAccount, verifier]
  )

  const requestTwitter = useCallback(() => {
    const info = verifier.requestTwitter()
    return info
  }, [verifier])

  const verifyTwitter = useCallback(
    async (account: string, msghash: string, link: string) => {
      const result = await verifier.verifyTwitter(account, msghash, link)
      return result
    },
    [verifier]
  )

  const addTwitter = useCallback(
    async (record: SocialAccountModel) => {
      const accounts = await client.socialAccount.list()
      const item = accounts.find(
        row => row.type === 'twitter' && row.account === record.account
      )
      if (item) throw new Error('Account exists')
      await client.socialAccount.add(record)
    },
    [client.socialAccount]
  )

  const removeAccount = useCallback(
    async (dataId: string) => {
      await client.socialAccount.remove(dataId)
      list()
    },
    [client.socialAccount, list]
  )

  return {
    socials,
    list,
    addTwitter,
    requestTwitter,
    verifyTwitter,
    removeAccount
  }
}
