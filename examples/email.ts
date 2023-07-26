import { AliyunClient, AliyunEmailOpenAPI } from 'aliyun-openapi'

const client = new AliyunClient({
  accessKeyId: 'your_access_key_id',
  accessKeySecret: 'your_access_key_secret',
  version: '2015-11-23',
  endpoint: 'dm.aliyuncs.com',
})
const openapi = new AliyunEmailOpenAPI(client)

await openapi.send('noreply@test.com', 'alice@test.com', 'Verification Code', `<h2>Verification code: 123456<h2>`)
