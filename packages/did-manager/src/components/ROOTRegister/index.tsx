import { useState } from 'react'

import ROOTModal from '../ROOTModal'
import ROOTButton from '../ROOTButton'
import { useROOT } from '../../hooks/webROOT'

interface Props {
  visible: boolean
  onClose: () => void
}

export default function ROOTRegister({ visible, onClose }: Props) {
  const { register } = useROOT()
  const [value, setValue] = useState('')
  const [loading, setLoading] = useState(false)

  const submit = async () => {
    try {
      setLoading(true)
      await register(value)
    } catch (error) {
      console.trace(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <ROOTModal visible={visible} onClose={onClose} title="DID Register">
      <div className="nft3-register">
        <div className="nft3-register__form">
          <input
            type="text"
            className="nft3-register__input"
            placeholder="Your DID name"
            value={value}
            onChange={e => {
              setValue(e.target.value.trim())
            }}
          />
          <div className="nft3-register__after">.isme</div>
        </div>
        <ROOTButton disabled={!value} loading={loading} onClick={submit}>
          Register
        </ROOTButton>
      </div>
    </ROOTModal>
  )
}
