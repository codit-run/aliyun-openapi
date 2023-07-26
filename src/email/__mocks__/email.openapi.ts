/**
 * The mock file provided for package use and external use. You can import it
 * for easy mocking. If you are using `vitest`, for example:
 * ```js
 * vi.mock('aliyun-openapi/email')
 * ```
 */

import type { AliyunSuccessResponse } from '../../core/types.js'

export class AliyunEmailOpenAPI {
  async send(): Promise<AliyunSuccessResponse> {
    return {
      RequestId: 'CFD9B571-EC50-59B2-81DA-BFDC894CD1C4',
      EnvId: '201663123603',
    }
  }

  async sendBatch(): Promise<AliyunSuccessResponse> {
    return {
      RequestId: 'E77C341A-A54C-5998-A000-D4BDBA1055C7',
      EnvId: '17870283528300239108',
    }
  }

  async getAccountSummary(): Promise<AliyunSuccessResponse> {
    return {
      DayuStatus: 0,
      SmsRecord: 0,
      MonthQuota: 62000,
      RequestId: '04841BF1-21E0-5541-AAD7-522CFDEE65E5',
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
    }
  }

  async getSendStatistics(options: Record<string, unknown>): Promise<AliyunSuccessResponse> {
    return {
      RequestId: '54BDEB4D-655D-54F5-8F15-9D19177FA8AC',
      data: {
        mailDetail: [
          {
            Status: 0,
            UtcLastUpdateTime: 1649429596,
            Message: '250 Send Mail OK',
            LastUpdateTime: '2022-04-08T22:53Z',
            ToAddress: 'alice@test.com',
            AccountName: 'noreply@test.com',
          },
        ],
      },
      NextStart: '651e284708#201#1649429501#alice@test.com.201605661077',
    }
  }
}
