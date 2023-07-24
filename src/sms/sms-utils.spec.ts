
import { test, expect } from 'vitest'
import { stripE164, toCSTDateString } from './sms-utils.js'

const numbers = [
  ['+8613812345678', '13812345678'],
  ['8613812345678', '13812345678'],
  ['13812345678', '13812345678'],
  ['+85212345678', '85212345678'],
  ['85212345678', '85212345678'],
  ['12345678', '12345678'],
] as const

test.each(numbers)('stripE164', (a: string, b: string) => {
  expect(stripE164(a)).toBe(b)
})

const dates = [
  [new Date('2022-11-24T14:22:30Z'), '20221124'],
  [new Date('2023-07-04T14:22:30Z'), '20230704'],
  [new Date('2023-07-04T18:22:30Z'), '20230705'],
] as const

test.each(dates)('toCSTDateString', (date: Date, cst: string) => {
  expect(toCSTDateString(date)).toBe(cst)
})
