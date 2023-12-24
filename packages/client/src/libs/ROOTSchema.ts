import { JSONSchema7Definition } from 'json-schema'
import ROOTClient from './ROOTClient'
import ROOTDID from './ROOTDID'

export default class ROOTSchema {
  private client: ROOTClient
  private did?: ROOTDID

  constructor(client: ROOTClient, did?: ROOTDID) {
    this.client = client
    this.did = did
  }

  /**
   * create ROOTSchema
   * @param options 
   * @returns 
   */
  async create(options: {
    name: string
    description: string
    schema: JSONSchema7Definition
  }) {
    if (!this.did) throw new Error('DID required')
    const result = await this.did.send<string>('nft3_model_create', {
      msg: {},
      name: options.name,
      description: options.description,
      schema: JSON.stringify(options.schema)
    })
    return {
      modelName: result
    }
  }

  /**
   * ROOTSchema info
   * @param name 
   * @returns 
   */
  async get(name: string) {
    const result = await this.client.send('nft3_model_info', {
      name
    })
    return result
  }
}
