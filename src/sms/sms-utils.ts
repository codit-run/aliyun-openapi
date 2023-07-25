/**
 * Strips out E.164.
 *
 * Some query APIs do not accept phone numbers in the E.164 format, 'QuerySendDetails',
 * for example.
 *
 * E.164: https://www.twilio.com/docs/glossary/what-e164
 */
export function stripE164(number: string): string {
  if (number.startsWith('+'))
    number = number.slice(1)

  // China mainland number starts with '86' and '1', eg. '8613812345678'
  if (number.length === 13 && number.startsWith('861'))
    number = number.slice(2)

  return number
}

/**
 * Converts given date to China Standard Time (GMT+0800) date string, "20220409"
 * for example.
 *
 * Examples:
 * ```js
 * toCSTDateString()
 * // => '20230621'
 * ```
 */
export function toCSTDateString(date = new Date(), sep = ''): string {
  date.setUTCHours(date.getUTCHours() + 8) // add in offset of 8 hours
  return date.getUTCFullYear() + sep
    + ('0' + (date.getUTCMonth() + 1)).slice(-2) + sep
    + ('0' + date.getUTCDate()).slice(-2)
}
