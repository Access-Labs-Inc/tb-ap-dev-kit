
import { Connection, PublicKey } from '@solana/web3.js'
import { CentralState } from '@theblockcrypto/ap'

export async function getCentralState(connection: Connection, ACCESS_PROGRAM_ID: PublicKey) {
  if (!connection?.rpcEndpoint || !ACCESS_PROGRAM_ID?.toBase58()) {
    return {}
  }
  const [centralKey] = await CentralState.getKey(ACCESS_PROGRAM_ID)
  return CentralState.retrieve(connection, centralKey)
}
