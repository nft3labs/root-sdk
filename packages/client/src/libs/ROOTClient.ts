import ROOTGateway from './ROOTGateway'
import ROOTDID from './ROOTDID'
import ROOTSchema from './ROOTSchema'
import ROOTModel from './ROOTModel'
import ROOTProfile from './ROOTProfile'
import ROOTFollow from './ROOTFollow'
import ROOTSocialAccount from './ROOTSocialAccount'
import ROOTReferrer from './ROOTReferrer'

export default class ROOTClient {
  private gateway: ROOTGateway
  profile: ROOTProfile
  did: ROOTDID
  follow: ROOTFollow
  socialAccount: ROOTSocialAccount
  referrer: ROOTReferrer

  constructor(endpoint: string) {
    this.gateway = new ROOTGateway(endpoint)
    this.did = new ROOTDID(this)
    this.follow = new ROOTFollow(this)
    this.profile = new ROOTProfile(this)
    this.socialAccount = new ROOTSocialAccount(this)
    this.referrer = new ROOTReferrer(this)
  }

  send<T = any>(method: string, params: Record<string, any> = {}) {
    return this.gateway.send<T>(method, params)
  }

  schema() {
    return new ROOTSchema(this, this.did)
  }

  model<T = any>(modelId: string) {
    return new ROOTModel<T>(this, modelId)
  }
}
