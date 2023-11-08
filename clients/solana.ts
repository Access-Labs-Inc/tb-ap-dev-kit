import { Connection, PublicKey } from '@solana/web3.js'
import { getUserStakeState, getStakeAccount, getPoolData } from '~/services/access/pools'

export default (config: any) => {
    const {
        ACCESS_PROGRAM_ID,
        ACCESS_POOL_ID,
        SOLANA_RPC_PROVIDER_URL
    } = config

    const connection = new Connection(SOLANA_RPC_PROVIDER_URL, 'confirmed')
    const programId = new PublicKey(ACCESS_PROGRAM_ID)
    const poolId = new PublicKey(ACCESS_POOL_ID)

    return {
      async userHasAccess(owner: PublicKey) {
        const { pool } = await getPoolData(connection, poolId)
        const [_stakeKey, stakeAccount] = await getStakeAccount(connection, owner, programId, poolId)
        const [ hasAccess ]  = await getUserStakeState(connection, owner, programId, poolId, stakeAccount, pool)
        return hasAccess
      }
    }
}