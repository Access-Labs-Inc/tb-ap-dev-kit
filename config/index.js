module.exports = {
    publicRuntimeConfig: {
      ACCESS_UNSTAKE_URL: process.env.ACCESS_UNSTAKE_URL,
      ACCESS_PROGRAM_ID: process.env.ACCESS_PROGRAM_ID,
      ACCESS_POOL_ID: process.env.ACCESS_POOL_ID,
      ACCESS_API_URL: process.env.ACCESS_API_URL,
      SECONDS_IN_DAY: process.env.SECONDS_IN_DAY || 900,
      SOLANA_RPC_PROVIDER_URL: process.env.SOLANA_RPC_PROVIDER_URL || 'https://api.devnet.solana.com',
    },
  
    privateRuntimeConfig: {
    },
  }
  