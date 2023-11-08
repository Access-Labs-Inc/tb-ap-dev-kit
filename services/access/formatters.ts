import BN from 'bn.js'

export function formatAccWithDecimals(
  number: number | undefined,
  nan = '0',
  decimals = 6,
  decimalsToShow = 2,
): string {
  return number && number !== 0
    ? (number / Math.pow(10, decimals)).toLocaleString(undefined, {
        minimumFractionDigits: decimalsToShow,
        maximumFractionDigits: decimalsToShow,
      })
    : nan
}

export function BNToNumber(bigNumber: BN) {
  return bigNumber
    ? bigNumber.divn(Math.pow(10, 6)).toNumber()
    : 0
}

export function formatRewards(rewardsBN: BN) {
  return rewardsBN ? rewardsBN / Math.pow(10,6) : 0
}

export function formatBN(num: number | BN) {
  return typeof num === 'object' ? BNToNumber(num) : num
}

export function formatAcc(
  number: number | undefined,
  nan = '0',
  decimalsToShow = 2,
) {
  return number && number !== 0
    ? number.toLocaleString(undefined, {
        minimumFractionDigits: decimalsToShow,
        maximumFractionDigits: decimalsToShow,
      })
    : nan;
}

export function formatTimestamp(timestamp: number | undefined, na = '') {
  return timestamp
    ? new Date(timestamp * 1000).toLocaleDateString()
    : na;
}
