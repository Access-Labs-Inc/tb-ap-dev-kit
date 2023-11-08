import { PublicKey } from '@solana/web3.js'
import { verifyTransaction } from '~/services/access/nonce'
import { NonceKey } from '~/services/access/nonce'
import type { DataResources } from '~/types/DataResources'
import { ApiResponse } from '~/types/web3/solana/apiResponse'
import { ErrorMessage } from '~/types/web3/solana/Errors'

const methods = {
  POST: createSession,
  DELETE: destroySession
}

export interface LoginRequest {
  address: string;
  signedNonce: string;
}

async function createSession ({ auth, cache, solana }, req, _params, config, res) {
  try {
    const {
      body: {
        address = '',
        signedTransactionSerialized = ''
      }
    } = req
    const nonce = await cache.get(NonceKey.Nonce + address)

    if (!nonce) {
      return new ApiResponse(false, ErrorMessage.InvalidNonce)
    }

    // Verify transaction
    const isValidTransaction = verifyTransaction(signedTransactionSerialized, nonce)
    if (!isValidTransaction) {
      return new ApiResponse(false, ErrorMessage.InvalidNonce)
    }

    // Check amount staked
    const isValidStake = await solana.userHasAccess(new PublicKey(address))
    if (!isValidStake) {
      return new ApiResponse(false, ErrorMessage.InvalidStake)
    }

    // JWT
    const token = auth.sign({
      address,
      iat: new Date().getTime(),
      hasAccess: true
    }, config, res)
    return new ApiResponse(true, { token })
  } catch (err) {
    console.error(`Error validating nonce ${err}`)
    return new ApiResponse(false, ErrorMessage.ErrorValidatingNonce)
  }
}

function destroySession ({ auth }, req, _params, _config, res) {
  if (!auth.isValid(req)) {
    return
  }

  auth.destroy(res)

  return {
    data: {}
  }
}

export default async ({ auth, cache, solana }: DataResources, req: any, params: any, config, res) => {
  const { method } = req

  if (!Object.keys(methods).includes(method)) {
    return {
      data: {
        error: 'Invalid method'
      }
    }
  }

  return await methods[method]({ auth, cache, solana }, req, params, config, res)
}
