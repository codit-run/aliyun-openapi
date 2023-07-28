/**
 * Aliyun OpenAPI Client.
 *
 * References:
 * - [OpenAPI](https://next.api.aliyun.com/home)
 * - [Help](https://help.aliyun.com/document_detail/311601.html)
 * - [Sign util](https://www.npmjs.com/package/@alicloud/openapi-util)
 *
 * For internal access see:
 * - [VPC Endpoint](https://help.aliyun.com/document_detail/311601.html#sectiondiv-a2f-wsf-q14)
 *
 * The `options` example:
 * ```js
 * {
 *   accessKeyId: 'access_key_id',
 *   accessKeySecret: 'access_key_secret',
 *   version: '2017-05-25',
 *   endpoint: 'dysmsapi.aliyuncs.com',
 * }
 * ```
 */

import { createHmac, randomBytes } from 'node:crypto'
import { createError, type AliyunError } from './error.js'
import * as fetcher from './fetcher.js'
import type { AliyunErrorResponse, AliyunOptions, AliyunSuccessResponse } from './types.js'

export class AliyunClient {
  #options: AliyunOptions & { url: string }

  constructor(options: AliyunOptions) {
    this.#options = {
      ...options,
      url: 'https://' + options.endpoint,
    }
  }

  /**
   * Sends request.
   *
   * Note: A success response only indicates the message is successfully proceed
   * by Aliyun SMS, it does not mean the message has been delivered or received.
   *
   * @param action The action name.
   * @param options The action specific parameters.
   *
   * @throws {AliyunError}
   */
  async send(action: string, options?: Record<string, unknown>): Promise<AliyunSuccessResponse> {
    const params = this.#params(action, options)
    sign(this.#options.accessKeySecret, params)

    const res = await fetcher.post(this.#options.url, params)
    const data = await res.json() as AliyunSuccessResponse | AliyunErrorResponse

    if (res.ok && (!data.Code || data.Code === 'OK'))
      return data as AliyunSuccessResponse

    throw createError(`'${action}' is failed.`, data as AliyunErrorResponse)
  }

  /**
   * OpenAPI parameters consist of common parameters and action specific parameters.
   *
   * Common parameters: https://help.aliyun.com/document_detail/315526.html#sectiondiv-qq5-utu-r7a
   *
   * @param action The action name.
   * @param options The action specific parameters.
   */
  #params(action: string, options?: Record<string, unknown>): URLSearchParams {
    return new URLSearchParams({
      Action: action,
      Version: this.#options.version,
      Format: 'JSON',
      AccessKeyId: this.#options.accessKeyId,
      SignatureMethod: 'HMAC-SHA1',
      SignatureNonce: randomBytes(8).toString('hex'),
      SignatureVersion: '1.0',
      Timestamp: new Date().toISOString().slice(0, -5) + 'Z', // no milliseconds portion
      // `Signature` parameter will be set later
      ...options,
    })
  }
}

/**
 * Signs parameters.
 *
 * References:
 * - [OpenAPI signature](https://help.aliyun.com/document_detail/315526.html#section-wml-y32-4a2)
 * - [URLSearchParams no-escape & hex-table](https://github.com/nodejs/node/blob/v20.4.0/lib/internal/url.js#L1225)
 * - [DirectMail signature example](https://help.aliyun.com/document_detail/29442.html)
 *
 * Unlike `querystring` URLSearchParams encodes spaces as '+', and has adapted no-escape table.
 * URLSearchParams does not expose something like `querystring.escape`, use `encodeURIComponent` instead,
 * it works like `querystring` and is ok to use it to encode specific parameters.
 *
 * @param secret THe access key secret.
 */
function sign(secret: string, params: URLSearchParams) {
  params.sort()

  const string = params.toString()
    .replaceAll('+', '%20')
    .replaceAll('*', '%2A')
    .replaceAll('%7E', '~')
  const data = 'POST' + '&' + encodeURIComponent('/') + '&' + encodeURIComponent(string)
  const key = secret + '&'
  const signature = createHmac('sha1', key).update(data).digest('base64')

  params.set('Signature', signature)
}
