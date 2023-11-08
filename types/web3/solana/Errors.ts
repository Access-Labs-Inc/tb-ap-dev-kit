export interface PhantomError {
  code: 4900 | 4100 | 4001 | -32000 | -32003 | -32601 | -32603,
  message: String
}

export enum ErrorMessage {
  ErrorGeneratingNonce = 'Error: generating nonce',
  InvalidNonce = 'Error: invalid nonce',
  InvalidStake = 'Error: invalid stake',
  ErrorValidatingNonce = 'Error: validating nonce',
}
