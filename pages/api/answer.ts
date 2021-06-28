import type { NextApiRequest, NextApiResponse } from 'next'
import Redis from 'ioredis'

import { doWeHaveDailyToday, getZapierAnswer } from '../../utils/answer'

const { REDIS_URL } = process.env

const DEFAULT_RECURRENCE_IN_DAYS = process.env.RECURRENCE_IN_DAYS ?? '14'

const DEFAULT_REF_DATES = process.env.REF_DATES ?? '2021-06-14 10:00'

let redis: Redis.Redis | null = null

function fromStringToDates(datesStr: string) {
  return datesStr.split('|').map((dt) => new Date(dt))
}

async function getReferenceDates(): Promise<Date[]> {
  if (!redis) {
    return fromStringToDates(DEFAULT_REF_DATES)
  }

  const referenceDatesStr = (await redis.get('REF_DATES')) ?? DEFAULT_REF_DATES

  return fromStringToDates(referenceDatesStr)
}

async function getRecurrenceInDays(): Promise<number> {
  if (!redis) {
    return parseInt(DEFAULT_RECURRENCE_IN_DAYS, 10)
  }

  const recurrenceInDaysStr = await redis.get('RECURRENCE_IN_DAYS')

  return parseInt(recurrenceInDaysStr ?? DEFAULT_RECURRENCE_IN_DAYS, 10)
}

export default async (_req: NextApiRequest, res: NextApiResponse) => {
  redis = REDIS_URL ? new Redis(REDIS_URL) : null

  const referenceDates = await getReferenceDates()

  const recurrenceInDays = await getRecurrenceInDays()

  const answer = doWeHaveDailyToday(referenceDates, recurrenceInDays)

  const REF_DATES_FROM_REDIS = redis ? await redis.get('REF_DATES') : ''

  if (redis) {
    redis.quit()
  }

  res.status(200).json({
    REDIS_URL,
    REF_DATES_FROM_REDIS,
    answer,
    zapierTrigger: getZapierAnswer(answer),
  })
}
