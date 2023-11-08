import { PublicKey, Connection, clusterApiUrl } from '@solana/web3.js'
import {
    SET_PROGRAM_ID,
    SET_CONNECTION,
    SET_CENTRAL_STATE,
    SET_UNSTAKE_REDIRECT_URL
} from './types'
import { getCentralState } from '@/services/access/program'

export default {
    async init ({ commit }): Promise<any> {
        const { ACCESS_PROGRAM_ID, SOLANA_RPC_PROVIDER_URL, ACCESS_UNSTAKE_URL } = this.app.$config

        if (!ACCESS_PROGRAM_ID) {
            console.error(`No Program ID: ${ACCESS_PROGRAM_ID}`)
            return {
                programId: ''
            }
        }

        const connection = new Connection(SOLANA_RPC_PROVIDER_URL, 'confirmed')
        const programId = new PublicKey(ACCESS_PROGRAM_ID)
        const centralState = await getCentralState(connection, programId)

        commit(SET_PROGRAM_ID, programId)
        commit(SET_CONNECTION, connection)
        commit(SET_CENTRAL_STATE, centralState)
        commit(SET_UNSTAKE_REDIRECT_URL, ACCESS_UNSTAKE_URL)

        return {
            programId,
            connection,
            centralState
        }
    },
}
