/**
 * HTTP POST.
 *
 * Put fetching in a module to allow for spying & mocking.
 *
 * Success response with status 2xx and payload:
 * ```js
 * // 200
 * {
 *   RequestId: '68F9D1D3-D36C-5125-9CCD-1710571E669F',
 *   // result data...
 * }
 * ```
 *
 * Error response with status 4xx/5xx and payload:
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
 * References:
 * - [OpenAPI Request/Response](https://help.aliyun.com/document_detail/315526.html#section-9x3-wo3-8l9)
 * - [OpenAPI Troubleshoot](https://next.api.aliyun.com/troubleshoot)
 *
 * As per spec "Content-Type" will be set to "application/x-www-form-urlencoded"
 * automatically when body is type of "URLSearchParams",
 * see https://github.com/nodejs/node/blob/v20.4.0/deps/undici/src/lib/fetch/body.js#L96
 */
export async function post(url: string, params: URLSearchParams) {
  return await fetch(url, {
    method: 'POST',
    body: params,
  })
}
