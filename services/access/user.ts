import {
    Token,
    TOKEN_PROGRAM_ID,
    ASSOCIATED_TOKEN_PROGRAM_ID,
} from '@solana/spl-token'

import { Connection, PublicKey } from '@solana/web3.js'
import BN from 'bn.js'
import selectn from 'selectn'

export enum UserRole {
    User,
    Admin
}

export type UserData = {
    balance: BN;
    role: UserRole;
}

export async function fetchAssociatedTokenAddress(publicKey: PublicKey, centralState: any): Promise<PublicKey | undefined> {
  if (!centralState || !publicKey) {
    return undefined
  }
  return await Token.getAssociatedTokenAddress(
    ASSOCIATED_TOKEN_PROGRAM_ID,
    TOKEN_PROGRAM_ID,
    centralState.tokenMint,
    publicKey,
  )
}

export async function fetchUser(connection: Connection, publicKey: PublicKey, centralState: any): Promise<UserData> {
    let balance = new BN(0)

    const userATA = await fetchAssociatedTokenAddress(publicKey, centralState)

    const role = centralState.authority.toBase58() === publicKey.toBase58() ?
        UserRole.Admin :
        UserRole.User

    const userAccount = await connection.getAccountInfo(userATA)

    if (!userAccount) {
        return {
            balance,
            role
        }
    }

    const accTokensBalance = await connection.getTokenAccountBalance(userATA)
    balance = new BN(selectn('value.amount', accTokensBalance))

    return {
        balance,
        role
    }
}
