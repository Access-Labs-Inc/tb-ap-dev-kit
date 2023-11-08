import { Connection, PublicKey } from '@solana/web3.js'

export default interface BalanceRequest {
  walletPubKey: PublicKey
  connection: Connection
}
