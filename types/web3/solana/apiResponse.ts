import { ErrorMessage } from "./Errors";

export interface NonceResponse {
  nonce: string;
}
export interface LoginResponse {
  token: string;
}

type Result = ErrorMessage | NonceResponse | LoginResponse;

export class ApiResponse {
  success: boolean
  result: Result | undefined
  constructor (success: boolean = false, result?: Result) {
    this.result = result
    this.success = success
  }
}
