import { useCallback, useState } from 'react'
import { ProfileModel, DIDInfo, WithMeta } from '@rootlabs/client'
import { useROOT } from '@rootlabs/did-manager'

export default function useProfile(identifier: string) {
  const [didinfo, setDidinfo] = useState<DIDInfo>()
  const [profile, setProfile] = useState<WithMeta<ProfileModel>>()
  const { client } = useROOT()

  const info = useCallback(async () => {
    const [didinfo, profile] = await Promise.all([
      client.did.info(identifier),
      client.profile.info(identifier)
    ])
    setDidinfo(didinfo)
    setProfile(profile)
  }, [identifier, client])

  return {
    profile,
    didinfo,
    info
  }
}
