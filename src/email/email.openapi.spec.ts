import { describe, expect, it, test, vi } from 'vitest'
import { AliyunClient } from '../core/client.js'
import { AliyunError } from '../core/error.js'
import { AliyunEmailOpenAPI } from './email.openapi.js'

const client = new AliyunClient({
  accessKeyId: 'access_key_id',
  accessKeySecret: 'access_key_secret',
  version: '2015-11-23',
  endpoint: 'dm.aliyuncs.com',
})
const openapi = new AliyunEmailOpenAPI(client)

describe('#send', () => {
  it('returns a success response', async () => {
    const spy = vi.spyOn(client, 'send').mockResolvedValueOnce({
      RequestId: 'F52D2B1B-6BE1-556B-BE9A-1F7BC8393DEF',
      EnvId: '600000026787584631',
    })
    const from = 'noreply@test.com'
    const to = 'alice@test.com'
    const subject = '请计算一道数据题 & Pythagorean theorem'
    const html = // contains special characters like "+ ~ ! ' ( ) *".
      ` <h2>高等数学 HIGHER_MATHEMATICS</h2>
        <pre>
         1. (a + b) * c ~= d
         2. x * y = z
         3. a' - b != c!
        </pre>

        <h2>The <b>Pythagorean theorem</b> is often expressed as the following equation:</h2>
        <p><var>a<sup>2</sup></var> + <var>b<sup>2</sup></var> = <var>c<sup>2</sup></var></p>
      `
    const response = await openapi.send(from, to, subject, html)

    expect(response).toHaveProperty('EnvId')
    expect(spy).toHaveBeenCalledTimes(1)
    spy.mockRestore()
  })

  it('throws an error', async () => {
    const error = new AliyunError('Send failed.', {
      RequestId: 'EAE8C0E4-EAF8-56D5-B435-322D1312D233',
      HostId: 'dm.aliyuncs.com',
      Code: 'InvalidToAddress',
      Message: 'The specified toAddress is invalid. It must contain the @ sign. The domain must consist of numbers, letters, underscores, minus signs, and periods. The account name must consist of numbers, letters, underscores, minus signs, and periods.',
      Recommend: 'https://api.aliyun.com/troubleshoot?q=InvalidToAddress&product=Dm',
    })
    const spy = vi.spyOn(client, 'send').mockRejectedValueOnce(error)
    const from = 'noreply@test.com'
    const to = 'alicetest.com'
    const subject = 'say hello'
    const html = 'hello world'

    await expect(openapi.send(from, to, subject, html)).rejects.toThrow('Send failed.')
    expect(spy).toHaveBeenCalledTimes(1)
    spy.mockRestore()
  })
})

test('#sendBatch', async () => {
  const spy = vi.spyOn(client, 'send').mockResolvedValueOnce({
    RequestId: '7EEF7886-94B8-5AD7-B597-9F7FAEBB0EC3',
    EnvId: '600000026787576346',
  })
  const from = 'noreply@test.com'
  const receiver = 'alice'
  const template = 'new_feature_trial'
  const response = await openapi.sendBatch(from, receiver, template)

  expect(response).toHaveProperty('EnvId')
  expect(spy).toHaveBeenCalledTimes(1)
  spy.mockRestore()
})

test('#getAccountSummary', async () => {
  const spy = vi.spyOn(client, 'send').mockResolvedValueOnce({
    DayuStatus: 0,
    SmsRecord: 0,
    MonthQuota: 62000,
    RequestId: 'CBF0A978-64A9-57FC-A11A-A784B3CD32B4',
    SmsTemplates: 0,
    Receivers: 0,
    Templates: 1,
    DailyQuota: 2000,
    UserStatus: 0,
    Domains: 1,
    QuotaLevel: 2,
    SmsSign: 0,
    MaxQuotaLevel: 10,
    EnableTimes: 0,
    Tags: 3,
    MailAddresses: 2,
  })
  const response = await openapi.getAccountSummary()

  expect(response).toHaveProperty('DailyQuota')
  expect(spy).toHaveBeenCalledTimes(1)
  spy.mockRestore()
})

test('#querySendStatistics', async () => {
  const spy = vi.spyOn(client, 'send').mockResolvedValueOnce({
    RequestId: '02410B09-8DE8-5439-A15E-B8D5FA8289BB',
    data: { mailDetail: [[], [], []] },
    NextStart: '651e284708#201#1690123631#alice@test.com.600000026902749495',
  })

  const response = await openapi.querySendStatistics({ Length: 3 })
  expect(Array.isArray((response.data as { mailDetail: object[] }).mailDetail)).toBe(true)
  expect(spy).toHaveBeenCalledTimes(1)
  spy.mockRestore()
})
