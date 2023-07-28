/**
 * Aliyun SMS OpenAPI.
 *
 * - [OpenAPI](https://next.api.aliyun.com/product/Dysmsapi)
 * - [Help](https://help.aliyun.com/product/4428-html)
 *
 * No internal VPC address for internal access.
 */

import { AliyunClient } from '../core/client.js'
import type { AliyunError } from '../core/error.js'
import type { AliyunSuccessResponse } from '../core/types.js'
import { stripE164, toCSTDateString } from './sms-utils.js'

export class AliyunSmsOpenAPI {
  #client: AliyunClient

  constructor(client: AliyunClient) {
    this.#client = client
  }

  /**
   * Sends SMS.
   *
   * References:
   * - [OpenAPI](https://next.api.aliyun.com/document/Dysmsapi/2017-05-25/SendSms)
   * - [Help](https://help.aliyun.com/document_detail/419273.htm)
   *
   * Success response:
   * ```js
   * {
   *   Message: 'OK',
   *   RequestId: '312BDEBE-4E0C-5995-804E-BAAFF8395F62',
   *   BizId: '628323749491270669^0',
   *   Code: 'OK'
   * }
   * ```
   *
   * Error response with status 200:
   * ```js
   * {
   *   Message: '触发分钟级流控Permits:1',
   *   RequestId: 'F9A1A492-53A7-57DF-8470-A787A068CEE8',
   *   Code: 'isv.BUSINESS_LIMIT_CONTROL'
   * }
   *
   * {
   *   Message: '触发小时级流控Permits:5',
   *   RequestId: '2E9DC9DA-F608-5D9D-9B93-AC5E3FB2B3DA',
   *   Code: 'isv.BUSINESS_LIMIT_CONTROL'
   * }
   *
   * {
   *   Message: '触发天级流控Permits:10',
   *   RequestId: '710B8576-10C2-5DC1-A17F-499E0AF3E637',
   *   Code: 'isv.BUSINESS_LIMIT_CONTROL'
   * }
   *
   * {
   *   Message: '该账号下找不到对应签名',
   *   RequestId: '565DCD41-CB82-54E0-A761-08497FDF6E8F',
   *   Code: 'isv.SMS_SIGNATURE_ILLEGAL'
   * }
   *
   * {
   *   Message: '签名和模板类型不一致',
   *   RequestId: 'BB30DB9A-B73F-535E-A848-38E9E5415352',
   *   Code: 'isv.SMS_SIGNATURE_SCENE_ILLEGAL'
   * }
   * ```
   *
   * Error response with status 4xx/5xx:
   * ```js
   * // 404
   * {
   *   Code: 'InvalidAccessKeyId.NotFound',
   *   HostId: 'dysmsapi.aliyuncs.com',
   *   Message: 'Specified access key is not found.',
   *   Recommend: 'https://api.aliyun.com/troubleshoot?q=InvalidAccessKeyId.NotFound&product=Dysmsapi',
   *   RequestId: 'E87A2536-9C7D-562F-B782-C2BB8C5D321A',
   * }
   * ```
   *
   * @param number Phone number, E.164 is also valid.
   * @param signName Sign name.
   * @param templateCode Template code.
   * @param templateParams Template parameters.
   *
   * @throws {AliyunError}
   */
  async send(
    number: string | string[],
    signName: string,
    templateCode: string,
    templateParams: Record<string, string>,
    options?: Partial<{
      SmsUpExtendCode: string
      OutId: string
    }>
  ): Promise<AliyunSuccessResponse> {
    if (Array.isArray(number)) number = number.join(',')
    return await this.#client.send('SendSms', {
      PhoneNumbers: number,
      SignName: signName,
      TemplateCode: templateCode,
      TemplateParam: JSON.stringify(templateParams),
      // SmsUpExtendCode
      // OutId
      ...options,
    })
  }

  /**
   * Sends batch sms.
   *
   * References:
   * - [OpenAPI](https://next.api.aliyun.com/document/Dysmsapi/2017-05-25/SendBatchSms)
   * - [Help](https://help.aliyun.com/document_detail/419274.html)
   *
   * Success response:
   * ```js
   * {
   *   Message: 'OK',
   *   RequestId: '638011E5-3A28-5884-855B-ADEA78198ECD',
   *   BizId: '624120549504895168^0',
   *   Code: 'OK'
   * }
   * ```
   *
   * @param numbers Phone numbers.
   * @param signNames Sign names.
   * @param template Template code.
   * @param templateParams Template parameters.
   *
   * @throws {AliyunError}
   */
  async sendBatch(
    numbers: string[],
    signNames: string[],
    template: string,
    templateParams: Record<string, string>[],
    options?: Partial<{
      SmsUpExtendCodeJson: string
      OutId: string
    }>
  ): Promise<AliyunSuccessResponse> {
    return await this.#client.send('SendBatchSms', {
      PhoneNumberJson: JSON.stringify(numbers),
      SignNameJson: JSON.stringify(signNames),
      TemplateCode: template,
      TemplateParamJson: JSON.stringify(templateParams),
      // SmsUpExtendCodeJson
      // OutId
      ...options,
    })
  }

  /**
   * Queries send statistics.
   *
   * References:
   * - [OpenAPI](https://next.api.aliyun.com/document/Dysmsapi/2017-05-25/QuerySendStatistics)
   * - [Help](https://help.aliyun.com/document_detail/419276.html)
   *
   * Success response:
   * ```js
   * {
   *   RequestId: '0C253EFB-1CFC-504E-8FE9-B5EC578B6C7A',
   *   Data: { TargetList: [Array], TotalSize: 1 },
   *   Code: 'OK'
   * }
   * ```
   *
   * @param mainland true if China's mainland, false if international
   * @param start The date object or date string in form of 'yyyyMMdd', within recent 30 days
   * @param end Same as `start`
   * @param options The options including PageSize, PageIndex
   *
   * @throws {AliyunError}
   */
  async querySendStatistics(
    mainland: boolean,
    start: Date | string,
    end: Date | string,
    options?: Partial<{
      PageSize: number
      PageIndex: number
      TemplateType: 0 | 1 | 2 | 3 | 7
      SignName: string
    }>,
  ): Promise<AliyunSuccessResponse> {
    if (start instanceof Date) start = toCSTDateString(start)
    if (end instanceof Date) end = toCSTDateString(end)
    return await this.#client.send('QuerySendStatistics', {
      IsGlobe: mainland ? 1 : 2,
      StartDate: start,
      EndDate: end,
      PageSize: 10,
      PageIndex: 1,
      // TemplateType
      // SignName
      ...options,
    })
  }

  /**
   * Queries send details.
   *
   * References:
   * - [OpenAPI](https://next.api.aliyun.com/document/Dysmsapi/2017-05-25/QuerySendDetails)
   * - [Help](https://help.aliyun.com/document_detail/419277.html)
   *
   * Success response:
   * ```js
   * {
   *   TotalCount: 3,
   *   Message: 'OK',
   *   RequestId: 'EB336232-6A4C-55B7-ACF7-D95F4432B5E4',
   *   Code: 'OK',
   *   SmsSendDetailDTOs: { SmsSendDetailDTO: [Array] },
   * }
   * ```
   *
   * @param number Phone number, the leading '+' and '86' will be removed.
   * @param date The date object or date string in form of 'yyyyMMdd', within recent 30 days.
   * @param options The options including BizId, PageSize, CurrentPage.
   *
   * @throws {AliyunError}
   */
  async querySendDetails(
    number: string,
    date: Date | string,
    options?: Partial<{
      BizId: string
      PageSize: number
      CurrentPage: number
    }>,
  ): Promise<AliyunSuccessResponse> {
    if (date instanceof Date) date = toCSTDateString(date)
    return await this.#client.send('QuerySendDetails', {
      PhoneNumber: stripE164(number),
      // BizId
      SendDate: date,
      PageSize: 10,
      CurrentPage: 1,
      ...options,
    })
  }
}
