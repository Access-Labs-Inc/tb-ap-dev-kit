import { generateNonce } from '~/services/access/nonce'
import { ApiResponse } from '~/types/web3/solana/apiResponse'
import { ErrorMessage } from '~/types/web3/solana/Errors'
import { NonceKey } from '~/services/access/redis'

export interface NonceRequest {
  address: string;
}

export default async (request: NonceRequest, cache, reply) => {
  try {

    // Generate nonce
    const nonce = generateNonce()

    // Store nonce in db
    const { body: { address = '' } } = request

    //store NonceKey.Nonce + address somewhere temporarily to check later
    cache.set(NonceKey.Nonce + address)

    reply(new ApiResponse(true, { nonce }))

  } catch (err) {
    reply(new ApiResponse(false, ErrorMessage.ErrorGeneratingNonce), 500)
  }
}
