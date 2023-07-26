import { AliyunClient, AliyunSmsOpenAPI } from 'aliyun-openapi'

const client = new AliyunClient({
  accessKeyId: 'your_access_key_id',
  accessKeySecret: 'your_access_key_secret',
  version: '2017-05-25',
  endpoint: 'dysmsapi.aliyuncs.com',
})
const openapi = new AliyunSmsOpenAPI(client)

await openapi.send('13812345678', 'TestSigner', 'SMS_12345678', { code: '123456' })
