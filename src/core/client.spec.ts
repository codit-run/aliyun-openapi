import { describe, expect, it, vi } from 'vitest'
import { AliyunClient } from './client.js'
import * as fetcher from './fetcher.js'

const client = new AliyunClient({
  accessKeyId: 'key',
  accessKeySecret: 'secret',
  version: '2017-05-25',
  endpoint: 'dysmsapi.aliyuncs.com',
})

const successData = {
  Message: 'OK',
  RequestId: '312BDEBE-4E0C-5995-804E-BAAFF8395F62',
  BizId: '628323749491270669^0',
  Code: 'OK',
}

const rateLimitExceededError = {
  RequestId: '8F00DCA8-E028-5473-ADB6-3EBE460ABF05',
  Code: 'isv.BUSINESS_LIMIT_CONTROL',
  Message: '触发天级流控Permits:10',
}

function createResponse(data: object, ok = true): Response {
  return {
    ok,
    async json() { return data },
  } as Response
}

describe('#send', () => {
  it('returns a success response', async () => {
    const spy = vi.spyOn(fetcher, 'post').mockResolvedValueOnce(createResponse(successData))

    const res = await client.send('SendSms', {
      PhoneNumbers: '+13812345678',
    })
    expect(res).toStrictEqual(successData)
    expect(spy).toBeCalledTimes(1)
    spy.mockRestore()
  })

  it('throws an error ', async () => {
    const spy = vi.spyOn(fetcher, 'post').mockResolvedValueOnce(createResponse(rateLimitExceededError, false))

    await expect(client.send('SendSms', {})).rejects.toThrow(/^'SendSms' is failed: rate limit is exceeded.$/)
    expect(spy).toBeCalledTimes(1)
    spy.mockRestore()
  })
})
