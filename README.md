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

## Easy mocking

The package provides default mocking files, for example [`__mocks__/sms.openapi.ts`](https://github.com/codit-run/aliyun-openapi/tree/master/src/sms/__mocks__/sms.openapi.ts)

You can mock them in your testing. If you are using `vitest`, for example:
```ts
vi.mock('aliyun-openapi/sms')
vi.mock('aliyun-openapi/email')
```

## TODO
- Monorepo
- Documentation
