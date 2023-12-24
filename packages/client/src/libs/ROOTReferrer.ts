import ROOTClient from './ROOTClient'
import ROOTModel from './ROOTModel'

interface ReferrerModel {
  referrer_did: string
}

export default class ROOTReferrer {
  private model: ROOTModel<ReferrerModel>
  private client: ROOTClient

  constructor(client: ROOTClient) {
    this.client = client
    this.model = client.model('referrer')
  }

  async add(identifier: string) {
    if (identifier === this.client.did.identifier) {
      throw new Error('invalid identifier')
    }
    const record = await this.model.findOne({
      identifier: this.client.did.identifier,
      query: {}
    })
    if (record) throw new Error('referrer already exists')
    const info = await this.client.did.info(identifier)
    if (!info) throw new Error('identifier not found')
    const result = await this.model.insertOne({
      referrer_did: identifier
    })
    return result
  }

  async info(identifier: string) {
    const result = await this.model.findOne({
      identifier,
      query: {}
    })
    return result
  }

  async count(identifier: string) {
    const result = await this.model.count({
      count: {
        referrer_did: identifier
      }
    })
    return result.count
  }

  async list(identifier: string, offset?: number, limit?: number) {
    const result = await this.model.find({
      query: {
        referrer_did: identifier
      },
      offset,
      limit
    })
    return result
  }
}
