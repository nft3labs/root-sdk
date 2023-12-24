import ROOTClient from './ROOTClient'
import ROOTModel from './ROOTModel'

export interface SocialAccountModel {
  account: string
  type: string
  proof: string
  verifier_key: string
  msghash: string
}

export default class ROOTSocialAccount {
  private model: ROOTModel<SocialAccountModel>
  private client: ROOTClient

  constructor(client: ROOTClient) {
    this.client = client
    this.model = client.model('social')
  }

  async list(identifier?: string) {
    identifier = identifier || this.client.did.identifier
    const result = await this.model.find({
      identifier,
      query: {}
    })
    return result
  }

  async add(record: SocialAccountModel) {
    await this.model.insertOne(record)
  }

  async remove(dataId: string) {
    await this.model.deleteOne(dataId)
  }
}
