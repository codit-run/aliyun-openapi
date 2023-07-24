
import { describe, expect, it } from 'vitest'
import { createError } from './error.js'

describe('createError', () => {
  it('creates a "AliyunQuotaExceededError"', () => {
    const quotaExceededError = createError('Send failed.', {
      RequestId: 'F9A1A492-53A7-57DF-8470-A787A068CEE8',
      Message: 'The daily volume limit is exceeded.',
      Code: 'isv.DAY_LIMIT_CONTROL',
    })
    const quotaExceededErrorJson = {
      name: 'AliyunQuotaExceededError',
      message: 'Send failed: day quota is exceeded.',
      response: {
        RequestId: 'F9A1A492-53A7-57DF-8470-A787A068CEE8',
        Message: 'The daily volume limit is exceeded.',
        Code: 'isv.DAY_LIMIT_CONTROL',
      },
    }

    expect(quotaExceededError.toJSON()).toStrictEqual(quotaExceededErrorJson)
    expect(JSON.stringify(quotaExceededError)).toBe(JSON.stringify(quotaExceededErrorJson))
    expect(quotaExceededError.toString()).toBe('AliyunQuotaExceededError: Send failed: day quota is exceeded.') // default is `${name}: ${message}`
  })

  it('creates a "AliyunRateLimitExceededError"', () => {
    const rateLimitExceededError = createError('Send failed.', {
      RequestId: '8F00DCA8-E028-5473-ADB6-3EBE460ABF05',
      Message: '触发天级流控Permits:10',
      Code: 'isv.BUSINESS_LIMIT_CONTROL',
    })
    const rateLimitExceededErrorJson = {
      name: 'AliyunRateLimitExceededError',
      message: 'Send failed: rate limit is exceeded.',
      response: {
        RequestId: '8F00DCA8-E028-5473-ADB6-3EBE460ABF05',
        Message: '触发天级流控Permits:10',
        Code: 'isv.BUSINESS_LIMIT_CONTROL',
      },
    }

    expect(rateLimitExceededError.toJSON()).toStrictEqual(rateLimitExceededErrorJson)
    expect(JSON.stringify(rateLimitExceededError)).toBe(JSON.stringify(rateLimitExceededErrorJson))
    expect(rateLimitExceededError.toString()).toBe('AliyunRateLimitExceededError: Send failed: rate limit is exceeded.') // default is `${name}: ${message}`
  })

  it('creates the general "AliyunError" error', () => {
    const generalError = createError('Send failed.', {
      RequestId: '2D665F1E-AD03-5D62-A9B9-FE489CD713A1',
      Message: 'Signature is mandatory for this action.',
      HostId: 'dm.aliyuncs.com',
      Code: 'MissingSignature',
    })
    const generalErrorJson = {
      name: 'AliyunError',
      message: 'Send failed.',
      response: {
        RequestId: '2D665F1E-AD03-5D62-A9B9-FE489CD713A1',
        Message: 'Signature is mandatory for this action.',
        HostId: 'dm.aliyuncs.com',
        Code: 'MissingSignature',
      },
    }

    expect(generalError.toJSON()).toStrictEqual(generalErrorJson)
  })
})
