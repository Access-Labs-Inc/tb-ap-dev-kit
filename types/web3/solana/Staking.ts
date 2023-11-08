import { StakePool, StakeAccount } from '@theblockcrypto/ap'
import { PublicKey } from '@solana/web3.js'

export type PoolData = {
  email: string;
  name: string;
  publicKey: PublicKey;
  description: string;
  twitter: string;
  website: string;
  image_url: string;
  hero_image_url?: string;
  logo_image_url?: string;
  hasAccess: boolean
}

export type Indicator = {
  name: string,
  status: string
  text: string
}

export type Pool = StakePool & PoolData

export interface Stake {
  poolID: string,
  data?: StakePool,
  stakeAccount?: StakeAccount,
  stakeKey: any,
  stakerAta: PublicKey,
  stakerAtaAccount: any,
  minStake: number,
  userBalance: number,
  rewards: number,
  stakedAmount: number,
  associatedWallet: boolean,
  indicators: {
    [name: string]: Indicator,
  },
  protocolFee: number,
  loading: boolean,
  loadingAction: string,
  error: string,
  hasAccess: false
}
