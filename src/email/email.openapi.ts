
/**
 * Aliyun DirectMail OpenAPI.
 *
 * References:
 * - [OpenAPI](https://next.api.aliyun.com/product/Dm)
 * - [Help](https://help.aliyun.com/product/29412.html)
 *
 * No internal VPC address for internal access.
 *
 * Note: All parameters will be converted to strings by URLSearchParams.
 */

import { AliyunClient } from '../core/client.js'
import type { AliyunError } from '../core/error.js'
import type { AliyunSuccessResponse } from '../core/types.js'

export class AliyunEmailOpenAPI {
  #client: AliyunClient

  constructor(client: AliyunClient) {
    this.#client = client
  }

  /**
   * Sends a single email.
   *
   * References:
   * - [OpenAPI](https://next.api.aliyun.com/document/Dm/2015-11-23/SingleSendMail)
   * - [Help](https://help.aliyun.com/document_detail/29444.htm)
   *
   * Rate limit: 100 QPS
   *
   * Success payload:
   * ```js
   * {
   *   RequestId: 'CFD9B571-EC50-59B2-81DA-BFDC894CD1C4',
   *   EnvId: '201663123603',
   * }
   * ```
   *
   * Error with status 400 and payload:
   * ```js
   * {
   *   RequestId: 'DABF50BB-AC3D-505C-9522-0187D739D180',
   *   HostId: 'dm.aliyuncs.com',
   *   Code: 'InvalidToAddress',
   *   Message: 'The specified toAddress is invalid. It must contain the @ sign....',
   *   Recommend: 'https://next.api.aliyun.com/troubleshoot?q=InvalidToAddress&product=Dm',
   * }
   * ```
   *
   * @throws {AliyunError}
   */
  async send(
    from: string,
    to: string | string[],
    subject: string,
    body: string,
    options?: Partial<{
      AddressType: 0 | 1
      ReplyToAddress: boolean
      ClickTrace: 0 | 1
      FromAlias: string
      TagName: string,
      ReplyAddress: string
      ReplyAddressAlias: string
    }>
  ): Promise<AliyunSuccessResponse> {
    if (Array.isArray(to)) to = to.join(',')
    return await this.#client.send('SingleSendMail', {
      AccountName: from,
      AddressType: 1,
      ReplyToAddress: false,
      Subject: subject,
      ToAddress: to,
      ClickTrace: 0,
      HtmlBody: body,  // up to 28K
      // FromAlias
      // TextBody: '', // 'TextBody' and 'HtmlBody' are mutual exclusive
      // TagName: tag,
      // ReplyAddress
      // ReplyAddressAlias
      ...options,
    })
  }

  /**
   * Sends batch emails.
   *
   * References:
   * - [OpenAPI](https://next.api.aliyun.com/document/Dm/2015-11-23/BatchSendMail)
   * - [Help](https://help.aliyun.com/document_detail/29445.html)
   *
   * Rate limit: 20/min
   *
   * Success payload:
   * ```js
   * {
   *   RequestId: 'E77C341A-A54C-5998-A000-D4BDBA1055C7',
   *   EnvId: '17870283528300239108'
   * }
   * ```
   *
   * @param from The batch account.
   * @param receiver The receiver list name.
   * @param template The template name.
   *
   * @throws {AliyunError}
   */
  async sendBatch(
    from: string,
    receiver: string,
    template: string,
    options?: Partial<{
      AddressType: 0 | 1
      ClickTrace: 0 | 1
      TagName: string
      ReplyAddress: string
      ReplyAddressAlias: string
    }>,
  ): Promise<AliyunSuccessResponse> {
    return await this.#client.send('BatchSendMail', {
      AccountName: from,
      AddressType: 1,
      ReceiversName: receiver,
      TemplateName: template,
      ClickTrace: 0,
      // TagName: tag,
      // ReplyAddress
      // ReplyAddressAlias
      ...options,
    })
  }

  /**
   * Gets account summary.
   *
   * References:
   * - [OpenAPI](https://next.api.aliyun.com/document/Dm/2015-11-23/DescAccountSummary)
   * - [Help](https://help.aliyun.com/document_detail/141133.html)
   *
   * Success payload:
   * ```js
   * {
   *   DayuStatus: 0,
   *   SmsRecord: 0,
   *   MonthQuota: 62000,
   *   RequestId: '04841BF1-21E0-5541-AAD7-522CFDEE65E5',
   *   SmsTemplates: 0,
   *   Receivers: 0,
   *   Templates: 1,
   *   DailyQuota: 2000,
   *   UserStatus: 0,
   *   Domains: 1,
   *   QuotaLevel: 2,
   *   SmsSign: 0,
   *   MaxQuotaLevel: 10,
   *   EnableTimes: 0,
   *   Tags: 3,
   *   MailAddresses: 2
   * }
   * ```
   *
   * @throws {AliyunError}
   */
  async getAccountSummary(): Promise<AliyunSuccessResponse> {
    return await this.#client.send('DescAccountSummary')
  }

  /**
   * Queries send statistics.
   *
   * References:
   * - [OpenAPI](https://next.api.aliyun.com/document/Dm/2015-11-23/SenderStatisticsDetailByParam)
   * - [help](https://help.aliyun.com/document_detail/314330.html#h2-u83B7u53D6u53D1u9001u8BE6u60C524)
   *
   * Success payload:
   * ```js
   * {
   *   RequestId: '54BDEB4D-655D-54F5-8F15-9D19177FA8AC',
   *   data: {
   *     mailDetail: [
   *       {
   *         Status: 0,
   *         UtcLastUpdateTime: 1649429596,
   *         Message: '250 Send Mail OK',
   *         LastUpdateTime: '2022-04-08T22:53Z',
   *         ToAddress: 'alice@test.com',
   *         AccountName: 'alice@test.com'
   *       },
   *     ]
   *   },
   *   NextStart: '651e284708#201#1649429501#alice2test.com.201605661077'
   * }
   * ```
   *
   * @param options Including Length, Status, etc.
   *
   * @throws {AliyunError}
   */
  async querySendStatistics(options?: Partial<{
    AccountName: string
    TagName: string
    StartTime: string
    EndTime: string
    ToAddress: string
    Status: 0 | 2 | 3 | 4
    Length: number
    NextStart: string
  }>): Promise<AliyunSuccessResponse> {
    return await this.#client.send('SenderStatisticsDetailByParam', options)
  }
}
