/**
 * Strips out E.164.
 *
 * Some query APIs do not accept phone numbers in the E.164 format, 'QuerySendDetails',
 * for example.
 *
 * E.164: https://www.twilio.com/docs/glossary/what-e164
 */
export function stripE164(number: string): string {
  if (number.startsWith('+86')) // china mainland
    return number.slice(3)

  if (number.startsWith('86')) // china mainland
    return number.slice(2)

  if (number.startsWith('+')) // international/hk/mo/tw
    return number.slice(1)

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
