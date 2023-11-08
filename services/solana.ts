import { Connection, LAMPORTS_PER_SOL, PublicKey, Transaction, TransactionInstruction } from '@solana/web3.js'
import { SendTransactionOptions } from '@solana/wallet-adapter-base'

const MAX_CONFIRM_ATTEMPTS = 20

async function sleep(milliseconds: number) {
  console.log("Sleeping for ", milliseconds, " ms");
  return new Promise((resolve) => setTimeout(resolve, milliseconds))
}

export async function sendTx (
  connection: Connection,
  feePayer: PublicKey,
  instructions: TransactionInstruction[],
  sendTransaction: (
    tx: Transaction,
    connection: Connection,
    options?: SendTransactionOptions,
  ) => Promise<string>,
  options?: SendTransactionOptions,
) {
  const tx = new Transaction().add(...instructions);
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  tx.recentBlockhash = (await connection.getLatestBlockhash()).blockhash
  tx.feePayer = feePayer
  const signature = await sendTransaction(tx, connection, options)

  return confirmTransaction(tx, connection, signature, options)
}

// Why? https://github.com/solana-labs/solana/issues/25955
async function confirmTransaction(
  tx: Transaction,
  connection: Connection,
  signature: string,
  options?: SendTransactionOptions
) {
  try {
    if (tx.recentBlockhash && tx.lastValidBlockHeight) {
      await connection.confirmTransaction(
        {
          signature,
          blockhash: tx.recentBlockhash,
          lastValidBlockHeight: tx.lastValidBlockHeight,
        },
        options ? options.commitment : 'finalized',
      )
    } else {
      await connection.confirmTransaction(
        signature,
        options ? options.commitment : 'finalized',
      )
    }
  } catch (e) {
    let status = await connection.getSignatureStatus(signature)
    let attempt = 1
    
    console.log('Signature status: ', status.value?.confirmationStatus)

    while (status.value?.confirmationStatus !== 'finalized' && attempt < MAX_CONFIRM_ATTEMPTS) {
      // eslint-disable-next-line no-await-in-loop
      await sleep(1000)
      
      console.log(`waiting for confirmation... (${attempt})`)
      // eslint-disable-next-line no-await-in-loop
      status = await connection.getSignatureStatus(signature)
      attempt++
    }

    return status

  }
}

export async function getSOLBalance (connection: Connection, publicKey: PublicKey): Promise<number> {
  try {
    return (await connection.getBalance(publicKey)) / LAMPORTS_PER_SOL
  } catch (e) {
    return e.message
  }
}
