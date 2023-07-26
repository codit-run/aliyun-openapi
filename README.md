# aliyun-openapi

[![npm][npm-img]][npm-url]
[![build status][build-img]][build-img]
[![npm download][download-img]][download-url]

[npm-img]: https://img.shields.io/npm/v/aliyun-openapi.svg
[npm-url]: https://www.npmjs.org/package/aliyun-openapi
[build-img]: https://github.com/codit-run/aliyun-openapi/actions/workflows/ci.yml/badge.svg
[build-url]: https://github.com/codit-run/aliyun-openapi/actions/workflows/ci.yml
[download-img]: https://img.shields.io/npm/dm/aliyun-openapi.svg
[download-url]: https://www.npmjs.org/package/aliyun-openapi

Aliyun OpenAPI

## Installation

```shell
$ npm install aliyun-openapi
```

## Open APIs

- SMS
- Email

## Usage

### SMS

```ts
import { AliyunClient, AliyunSmsOpenAPI } from 'aliyun-openapi'

const client = new AliyunClient({
  accessKeyId: 'your_access_key_id',
  accessKeySecret: 'your_access_key_secret',
  version: '2017-05-25',
  endpoint: 'dysmsapi.aliyuncs.com',
})
const openapi = new AliyunSmsOpenAPI(client)

await openapi.send('13812345678', 'TestSigner', 'SMS_12345678', { code: '123456' })
```

### Email

```ts
import { AliyunClient, AliyunEmailOpenAPI } from 'aliyun-openapi'

const client = new AliyunClient({
  accessKeyId: 'your_access_key_id',
  accessKeySecret: 'your_access_key_secret',
  version: '2015-11-23',
  endpoint: 'dm.aliyuncs.com',
})
const openapi = new AliyunEmailOpenAPI(client)

await openapi.send('noreply@test.com', 'alice@test.com', 'Verification Code', `<h2>Verification code: 123456<h2>`)
```

## TODO
- Monorepo
- Documentation
