import { describe, expect, it, test, vi } from 'vitest'
import { AliyunClient } from '../core/client.js'
import { AliyunRateLimitExceededError } from '../core/error.js'
import { AliyunSmsOpenAPI } from './sms.openapi.js'

const number = '13812345678'
const signName = 'Test'
const template = 'SMS_123456789'

const client = new AliyunClient({
  accessKeyId: 'access_key_id',
  accessKeySecret: 'access_key_secret',
  version: '2017-05-25',
  endpoint: 'dysmsapi.aliyuncs.com',
})

const openapi = new AliyunSmsOpenAPI(client)

describe('#send', () => {
  it('returns a success response', async () => {
    const spy = vi.spyOn(client, 'send').mockResolvedValueOnce({
      Message: 'OK',
      RequestId: '5A7C6B4C-AA51-5ACA-9148-4A9DA58B2B74',
      Code: 'OK',
      BizId: '130717990127902095^0',
    })
    const params = { code: '123abc' }
    const response = await openapi.send(number, signName, template, params)

    expect(response).toHaveProperty('BizId')
    expect(spy).toHaveBeenCalledTimes(1)
    spy.mockRestore()
  })

  it('throws an error', async () => {
    const error = new AliyunRateLimitExceededError('Send failed.', {
      Message: '触发分钟级流控Permits:1',
      RequestId: 'F9A1A492-53A7-57DF-8470-A787A068CEE8',
      Code: 'isv.BUSINESS_LIMIT_CONTROL',
    })
    const spy = vi.spyOn(client, 'send').mockRejectedValueOnce(error)
    const params = { code: '123abc' }

    await expect(openapi.send(number, signName, template, params)).rejects.toThrow('Send failed.')
    expect(spy).toHaveBeenCalledTimes(1)
    spy.mockRestore()
  })
})

test('#sendBatch', async () => {
  const spy = vi.spyOn(client, 'send').mockResolvedValueOnce({
    Message: 'OK',
    RequestId: '638011E5-3A28-5884-855B-ADEA78198ECD',
    Code: 'OK',
    BizId: '624120549504895168^0',
  })
  const numbers = ['13811111111', '13822222222']
  const signNames = [signName, signName]
  const params = [{ code: '123abc' }, { code: '123ABC' }]
  const response = await openapi.sendBatch(numbers, signNames, template, params)

  expect(response).toHaveProperty('BizId')
  expect(spy).toHaveBeenCalledTimes(1)
  spy.mockRestore()
})

test('#querySendDetails', async () => {
  const spy = vi.spyOn(client, 'send').mockResolvedValueOnce({
    TotalCount: 3,
    Message: 'OK',
    RequestId: 'EB336232-6A4C-55B7-ACF7-D95F4432B5E4',
    Code: 'OK',
    SmsSendDetailDTOs: { SmsSendDetailDTO: [] },
  })
  const date = '20220409'
  const options = {
    BizId: '624120549504895168^0',
    PageSize: 10,
    CurrentPage: 1,
  }
  const response = await openapi.querySendDetails(number, date, options)

  expect(response).toHaveProperty('TotalCount')
  expect(spy).toHaveBeenCalledTimes(1)
  spy.mockRestore()
})

test('#querySendStatistics', async () => {
  const spy = vi.spyOn(client, 'send').mockResolvedValueOnce({
    RequestId: '0C253EFB-1CFC-504E-8FE9-B5EC578B6C7A',
    Data: {
      TargetList: [[], [], [], []],
      TotalSize: 4,
    },
    Code: 'OK',
  })
  const startDate = new Date()
  startDate.setMonth(startDate.getMonth() - 1)
  const start = startDate
  const end = new Date()
  const response = await openapi.querySendStatistics(true, start, end)

  expect(response).toHaveProperty('Data.TotalSize')
  expect(spy).toHaveBeenCalledTimes(1)
  spy.mockRestore()
})
