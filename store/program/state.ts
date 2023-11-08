import { Connection, PublicKey } from '@solana/web3.js'

export interface Program {
  programId: PublicKey,
  connection: Connection,
  centralState: Object
  unstakeURL: string
}

export default (): Program => ({
  programId: {},
  connection: {},
  centralState: {},
  unstakeURL: ''
})
