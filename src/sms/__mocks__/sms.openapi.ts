/**
 * The mock file provided for package use and external use. You can import it
 * for easy mocking. If you are using `vitest`, for example:
 * ```js
 * vi.mock('aliyun-openapi/sms')
 * ```
 */

import type { AliyunSuccessResponse } from '../../core/types.js'

export class AliyunSmsOpenAPI {
  async send(): Promise<AliyunSuccessResponse> {
    return {
      Message: 'OK',
      RequestId: '312BDEBE-4E0C-5995-804E-BAAFF8395F62',
      Code: 'OK',
      BizId: '628323749491270669^0',
    }
  }

  async sendBatch(): Promise<AliyunSuccessResponse> {
    return {
      Message: 'OK',
      RequestId: '638011E5-3A28-5884-855B-ADEA78198ECD',
      Code: 'OK',
      BizId: '624120549504895168^0',
    }
  }

  async querySendStatistics(): Promise<AliyunSuccessResponse> {
    return {
      RequestId: '0C253EFB-1CFC-504E-8FE9-B5EC578B6C7A',
      Data: {
        TargetList: [[], [], [], []],
        TotalSize: 4,
      },
      Code: 'OK',
    }
  }

  async querySendDetails(): Promise<AliyunSuccessResponse> {
    return {
      TotalCount: 3,
      Message: 'OK',
      RequestId: 'EB336232-6A4C-55B7-ACF7-D95F4432B5E4',
      Code: 'OK',
      SmsSendDetailDTOs: { SmsSendDetailDTO: [] },
    }
  }
}
