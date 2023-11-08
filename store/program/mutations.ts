import {
    SET_PROGRAM_ID,
    SET_CONNECTION,
    SET_CENTRAL_STATE,
    SET_UNSTAKE_REDIRECT_URL
} from './types'

export default {
    [SET_PROGRAM_ID](state, programId) {
        state.programId = programId
    },
    [SET_CONNECTION](state, connection) {
        state.connection = connection
    },
    [SET_CENTRAL_STATE](state, centralState) {
        state.centralState = centralState
    },
    [SET_UNSTAKE_REDIRECT_URL] (state, url) {
      state.unstakeURL = url
    }
}
