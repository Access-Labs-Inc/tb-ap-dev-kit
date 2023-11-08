import { Stake } from '@/types/web3/solana/Staking'

export default (): Stake => ({
  poolID: '',
  hasAccess: false,
  minStake: 0,
  userBalance: 0,
  rewards: 0,
  stakedAmount: 0,
  stakeAccount: {},
  stakeKey: {},
  stakerAta: {},
  stakerAtaAccount: {},
  data: {},
  associatedWallet: false,
  indicators: {},
  protocolFee: 0.02,
  loading: false,
  loadingAction: '',
  error: ''
})
