import { Connection } from '@solana/web3.js'
import { Program } from './state'
import { publicRuntimeConfig } from '~/config/index'

export default {
  connection: (state: Program) => state.connection,
  mutableConnection: (_state: Program) => ($config) => new Connection($config.SOLANA_RPC_PROVIDER_URL, 'confirmed'),
  programId: (state: Program) => state.programId,
  centralState: (state: Program) => state.centralState,
  unstakeURL: (state: Program) => state.unstakeURL
}
