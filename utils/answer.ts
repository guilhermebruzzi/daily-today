import differenceInCalendarDays from 'date-fns/differenceInCalendarDays'

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
