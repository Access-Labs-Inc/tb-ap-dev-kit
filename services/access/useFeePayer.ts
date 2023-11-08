import { Connection,  PublicKey, Transaction, TransactionSignature } from '@solana/web3.js'
import { SendTransactionOptions } from '@solana/wallet-adapter-base'

const emptyFeePayerKey='5jE9LY7kKzpyaTp95QdQD5DMKEv3Aa6FRb4fPZKVR5Jz'//add this to temp. disable fee-payer in case of issues

export async function signTransactionWithFeePayer(transaction: Transaction, $config: any) {
  const body = transaction
    .serialize({
      requireAllSignatures: false,
    })
    .toString('hex')

  return fetch(`${$config.ACCESS_API_URL}/pay-fees`, {
    method: 'POST',
    headers: {
      'Content-Type': 'text/plain'
    },
    body
  }).then(res => {
    if (!res.ok) {
      throw Error('Unable to sign request on the backend')
    }
    return res
  }).then(res => res.text())
}

export async function getFeePayer($config: any) {
  return fetch(`${$config.ACCESS_API_URL}/pay-fees`).then(r => r.text())
}

export async function useFeePayer(props: {
  sendTransaction: (
    transaction: Transaction,
    connection: Connection,
    options?: SendTransactionOptions,
  ) => Promise<TransactionSignature>;
}, $config: any) {
  const feePayerPubKey = new PublicKey(emptyFeePayerKey)
  
  return {
    feePayerPubKey,
    async sendTranactionWithFeesPaid(
      transaction: Transaction,
      connection: Connection,
      options?: SendTransactionOptions,
    ) {
      const response = await signTransactionWithFeePayer(transaction, $config)

      if (!response) {
        throw new Error('Failed to sign transaction on backend')
      }
      const tx = Transaction.from(Buffer.from(response, 'base64'))
      return tx.compileMessage().header.numRequiredSignatures === 1
        ? connection.sendRawTransaction(tx.serialize(), options)
        : props.sendTransaction(tx, connection, options)
    }
  }
}

