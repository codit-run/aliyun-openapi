/**
 * Common error codes:
 * https://developers.weixin.qq.com/doc/oplatform/Return_codes/Return_code_descriptions_new.html
 */

import { AliyunErrorResponse } from './types.js'

export function createError(message: string, response: AliyunErrorResponse) {
  const quotaExceededMessage = quotaExceededErrorMap(response.Code)
  if (quotaExceededMessage)
    return new AliyunQuotaExceededError(formatMessage(message, quotaExceededMessage), response)

  const rateLimitExceededMessage = rateLimitExceededErrorMap(response.Code)
  if (rateLimitExceededMessage)
    return new AliyunRateLimitExceededError(formatMessage(message, rateLimitExceededMessage), response)

  return new AliyunError(message, response)
}

// TODO: Email quota errors: 'DailyQuota' at https://help.aliyun.com/document_detail/141133.html
function quotaExceededErrorMap(code: string) {
  switch (code) {
    case 'isv.DAY_LIMIT_CONTROL': return 'day quota is exceeded'
    case 'isv.MONTH_LIMIT_CONTROL': return 'month quota is exceeded'
  }
}

function rateLimitExceededErrorMap(code: string) {
  switch (code) {
    case 'isv.BUSINESS_LIMIT_CONTROL': return 'rate limit is exceeded'
  }
}

function formatMessage(title: string, detail: string): string {
  if (title.at(-1) === '.')
    return title.slice(0, -1) + ': ' + detail + '.'
  return title + ': ' + detail
}

export class AliyunError extends Error {
  readonly response: AliyunErrorResponse

  constructor(message: string, response: AliyunErrorResponse) {
    super(message, { cause: response })
    Error.captureStackTrace(this, this.constructor)
    this.name = this.constructor.name
    this.response = response
    // TODO: logger
  }

  toJSON() {
    return {
      name: this.name,
      message: this.message,
      response: this.response,
    }
  }
}

// Some concret errors can be handled by caller.

export class AliyunQuotaExceededError extends AliyunError { }
export class AliyunRateLimitExceededError extends AliyunError { }
