export interface AliyunOptions {
  accessKeyId: string
  accessKeySecret: string
  version: string
  endpoint: string
}

export interface AliyunSuccessResponse {
  RequestId: string
  Code?: 'OK'
  Message?: string
  [key: string]: unknown
}

export interface AliyunErrorResponse {
  RequestId: string
  Code: string
  Message: string
  [key: string]: unknown
}
