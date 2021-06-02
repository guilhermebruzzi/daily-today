import { differenceInCalendarDays, subDays, format } from 'date-fns'

export type Answer = 'YES' | 'NO' | 'NOTHING'

const referenceDates = [
  new Date('2021-05-31 10:00'),
  new Date('2021-06-01 10:00'),
]

const RECURRENCE_IN_DAYS = 14

export function doWeHaveDailyToday(): Answer {
  const today = new Date()

  if (today.getDay() === 0 || today.getDay() === 6) {
    return 'NO'
  }

  const diffs = referenceDates.map((refDate) => {
    return differenceInCalendarDays(new Date(), refDate) % RECURRENCE_IN_DAYS
  })

  const todayIsPlanningDay = diffs.some((diff) => diff === 0)

  return todayIsPlanningDay ? 'NO' : 'YES'
}

export function getZapierAnswer(_answer: Answer) {
  const today = new Date()
  const yesterday = subDays(today, 1)
  const formatPattern = 'yyyy-MM-dd'

  return [
    { id: format(yesterday, formatPattern) },
    { id: format(today, formatPattern) },
  ]
}