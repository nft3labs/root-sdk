import { ROOTClient, ROOTQueryer, ROOTVerifier, FeaturedRecord } from '@rootlabs/client'

interface INote {
  title: string
  content: string
}

const aptosKey = '0x3b5bbeb04b15fee34601c9b83b208be7f69df20f8b579bf99e0d9d777d05e36d'
const solanaKey = 'Rrcv7QxrxCMr5JR9fvAmtt2NqFLNUdFFZdGZvqjowQDCQd5uR8XZnzWYh9xSuUQXTPbTTMAX4EfhHAyy4eA9ET7'
const privateKey = `0xf8494baeb681ed52a8847da8b59291472d40ed8babf6c0bb947d77a05af5b3a7`
const gatewayEndpoint = 'https://t0.onebitdev.com/nft3-gateway/'
const queryerEndpoint = 'https://t0.onebitdev.com/nft3-queryer/'
const verifierEndpoint = 'https://t0.onebitdev.com/nft3-verifier/'
const postModelId = 'testmodel-post'
const postDataId = '206708bb-5c25-4a7f-a772-9ac6da69e0c3'

const aptosClient = new ROOTClient(gatewayEndpoint)
aptosClient.did.config({
  network: 'aptos',
  privateKey: aptosKey
})

const solanaClient = new ROOTClient(gatewayEndpoint)
solanaClient.did.config({
  network: 'solana',
  privateKey: solanaKey
})

const client = new ROOTClient(gatewayEndpoint)
client.did.config({
  network: 'ethereum',
  privateKey
})
const verifier = new ROOTVerifier(client, verifierEndpoint)

async function aptosRegister() {
  try {
    const result = await aptosClient.did.register('laozhao3')
    console.log(result)
  } catch (error) {
    console.trace(error)
  }
}

async function solanaRegister() {
  try {
    const result = await solanaClient.did.register('laozhao')
    console.log(result)
  } catch (error) {
    console.trace(error)
  }
}

async function solanaLogin() {
  try {
    const result = await solanaClient.did.login()
    console.log(result)
  } catch (error) {
    console.trace(error)
  }
}

async function register() {
  try {
    const result = await client.did.register('lao8')
    console.log(result)
  } catch (error) {
    console.trace(error)
  }
}

async function login() {
  const result = await client.did.login()
  console.log(result)
}

async function checkLogin() {
  await client.did.login()
  const result = await client.did.checkLogin()
  console.log(result)
}

async function accounts() {
  await client.did.login()
  const result = await client.did.accounts()
  console.log(result)
}

async function getProfile() {
  const profile = await client.profile.info('did:nft3:imdaniel')
  console.log(profile)
}

async function setProfile() {
  try {
    await client.did.login()
    await client.profile.update({
      name: 'Daniel',
      bio: 'I\'m Daniel'
    })
  } catch (error) {
    console.trace(error)
  }
}

async function createModel() {
  try {
    await client.did.login()
    const appSchema = client.schema()
    const result = await appSchema.create({
      name: 'testmodel-post',
      description: 'post list',
      schema: {
        title: 'Post',
        type: 'object',
        properties: {
          title: {
            type: 'string',
            maxLength: 200
          },
          content: {
            type: 'string',
            maxLength: 5000
          }
        },
        required: ['title', 'content']
      }
    })
    console.log(result)
  } catch (error) {
    console.trace(error)
  }
}

async function modelInfo() {
  const schema = client.schema()
  const result = await schema.get(postModelId)
  console.log(result)
}

async function modelInsert() {
  try {
    await client.did.login()
    const noteModel = client.model<INote>(postModelId)
    const result = await noteModel.insertOne({
      title: 'test title 1',
      content: 'test content 1'
    })
    console.log(result)
  } catch (error) {
    console.trace(error)
  }
}

async function modelQuery() {
  const noteModel = client.model<INote>(postModelId)
  const result = await noteModel.find({
    query: {
      dataid: postDataId
    },
    offset: 0,
    limit: 10
  })
  console.log(result)
}

async function modelUpdate() {
  try {
    await client.did.login()
    const noteModel = client.model<INote>(postModelId)
    await noteModel.updateOne(postDataId, {
      title: 'test title 11a',
      content: 'test content 11a'
    })
  } catch (error) {
    console.trace(error)
  }
}

async function requestTwitter() {
  await client.did.login()
  const info = verifier.requestTwitter()
  console.log(info)
}

async function verifyProof() {
  const info = {
    did: 'did:nft3:alice',
    proof:
      'c27eb0858955ad7e1722b2f45a5d3f733db6ced22c35d65bc512fdcf4e19df0758da82c5d77692f37fe7aeaab24955fbd3afe9ece37f00d491e7d5da11a1a6bc01',
    account: 'Bart200c',
    type: 'twitter',
    verifier_key: ''
  }
  const result = verifier.verifyProof(info)
  console.log(result)
}

async function query() {
  const queryer = new ROOTQueryer(queryerEndpoint)
  const data = await queryer.query({
    ens: {
      did: 'did:nft3:cat'
    },
    nft3Stats: {}
  })
  console.log(data)
}

async function timeline() {
  const queryer = new ROOTQueryer(queryerEndpoint)
  const data = await queryer.query({
    tokens: {
      did: 'did:nft3:cat',
      offset: 0,
      limit: 5
    },
    timeline: {
      did: 'did:nft3:cat',
      offset: 0,
      limit: 5
    },
    ens: {
      address: '0x3eb4b12127EdC81A4d2fD49658db07005bcAd065'
    }
  })
  console.log(data)
}

async function follow() {
  await client.did.login()
  const result = await client.follow.follow('did:nft3:cat')
  console.log(result)
}

async function unfollow() {
  await client.did.login()
  const result = await client.follow.unfollow('did:nft3:cat')
  console.log(result)
}

async function followCount() {
  const result = await client.follow.count('did:nft3:laozhang')
  console.log(result)
}

async function following() {
  const result = await client.follow.following({
    identifier: 'did:nft3:laozhang'
  })
  console.log(result)
}

async function followers() {
  const result = await client.follow.followers({
    identifier: 'did:nft3:cat'
  })
  console.log(result)
}

async function count() {
  const noteModel = client.model('follow')
  const result = await noteModel.count({
    identifier: 'did:nft3:laozhang',
    count: {}
  })
  console.log(result)
}

async function search() {
  const result = await client.did.search({
    keyword: '0xB4c42d4B15AA65F782B81ac01Eaba2472F83B4e9',
    mode: 'address'
  })
  console.log(result)
}

async function featured() {
  const queryer = new ROOTQueryer(queryerEndpoint)
  const result = await queryer.query({
    nft3Featured: {
      offset: 0,
      limit: 5
    }
  })
  const items: FeaturedRecord[] = result.nft3Featured
  console.log(items)
}

async function didInfo() {
  const result = await client.did.info('did:nft3:test11')
  console.log(result)
}

async function referrerAdd() {
  await client.did.login()
  const result = await client.referrer.add('did:nft3:bob')
  console.log(result)
}

async function referrerInfo() {
  const result = await client.referrer.info('did:nft3:alicev1')
  console.log(result)
}

async function referrerCount() {
  const result = await client.referrer.count('did:nft3:bob')
  console.log(result)
}

async function referrerStsts() {
  const queryer = new ROOTQueryer(queryerEndpoint)
  const result = await queryer.query({
    nft3ReferrerStats: {
      did: 'did:nft3:bob'
    },
    nft3Stats: {}
  })
  console.log(result)
}

async function referrerList() {
  const result = await client.referrer.list('did:nft3:bob')
  console.log(result)
}

register()
