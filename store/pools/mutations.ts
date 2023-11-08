import {
  SET_POOL_ID,
  SET_MINIMUM_STAKE_AMOUNT,
  SET_USER_BALANCE,
  SET_STAKED_AMOUNT,
  SET_REWARD_AMOUNT,
  RESET_POOL,
  RESET_INDICATORS,
  SET_STAKE_ACCOUNT,
  SET_POOL_DATA,
  SET_LOADING,
  SET_RPC_ERROR,
  SET_STAKER_ATA,
  SET_STAKE_KEY,
  SET_HAS_ACCESS,
  SET_INDICATOR_STATUS
} from './types'
import Vue from 'vue'
import BN from 'bn.js'

import { StakePool, StakeAccount } from '@theblockcrypto/ap'
import { Stake } from '@/types/web3/solana/Staking'
import { PublicKey } from '@solana/web3.js'

export default {
  [SET_POOL_ID] (state: Stake, id: PublicKey) {
    state.poolID = id
  },
  [SET_MINIMUM_STAKE_AMOUNT] (state: Stake, amount: number) {
    state.minStake = amount
  },
  [SET_USER_BALANCE] (state: Stake, balance: number) {
    state.userBalance = balance
  },
  [SET_REWARD_AMOUNT] (state: Stake, rewards: number) {
    state.rewards = rewards
  },
  [SET_STAKED_AMOUNT] (state: Stake, amount: number) {
    state.stakedAmount = amount
  },
  [SET_RPC_ERROR] (state: Stake, message: string) {
    state.error = message
  },
  [SET_INDICATOR_STATUS] (state: Stake, {name, status, text}) {
    Vue.set(state.indicators, name, {name, status, text})
  },
  [SET_STAKE_ACCOUNT] (state: Stake, account: StakeAccount) {
    state.stakeAccount = account
  },
  [SET_STAKE_KEY] (state: Stake, key: PublicKey) {
    state.stakeKey = key
  },
  [SET_STAKER_ATA] (state: Stake, { stakerAta, stakerAtaAccount }) {
    state.stakerAta = stakerAta
    state.stakerAtaAccount = stakerAtaAccount
  },
  [SET_POOL_DATA] (state: Stake, pool: StakePool) {
    state.data = pool
  },
  [RESET_POOL] (state: Stake) {
    state.stakeAccount = {}
    state.stakeKey = {}
    state.stakerAta = {}
    state.stakerAtaAccount = {}
    state.hasAccess = false
    state.associatedWallet = false
    state.userBalance = new BN(0)
    state.minStake = new BN(0)
    state.stakedAmount = new BN(0)
    state.rewards = new BN(0)
  },
  [RESET_INDICATORS] (state: Stake) {
    state.indicators = {}
  },
  [SET_LOADING] (state: Stake, action = '') {
    state.loading = !state.loading
    state.loadingAction = action
  },
  [SET_HAS_ACCESS] (state: Stake, hasAccess) {
    Object.assign(state, {
      hasAccess
    })
  }
}
