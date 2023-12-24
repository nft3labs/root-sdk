import { useCallback, useEffect, useState } from 'react'
import { ProfileModel } from '@rootlabs/client'
import { useROOT } from '@rootlabs/did-manager'

export default function useProfile() {
  const [profile, setProfile] = useState<ProfileModel>()
  const { identifier, client } = useROOT()

  const info = useCallback(async () => {
    if (!identifier) {
      setProfile(undefined)
      return
    }
    const profile = await client.profile.info()
    setProfile(profile)
  }, [identifier, client])

  const update = useCallback(async (data: ProfileModel) => {
    const result = await client.profile.update(data)
    info()
    return result
  }, [client.profile, info])

  useEffect(() => {
    info()
  }, [info])

  return {
    profile,
    update
  }
}
