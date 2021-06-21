import { differenceInCalendarDays, format } from 'date-fns'

export type Answer = 'YES' | 'NO' | 'SKIP' | 'NOTHING'

export function doWeHaveDailyToday(
  referenceDates: Date[],
  recurrenceInDays: number
): Answer {
  const today = new Date()

  if (today.getDay() === 0 || today.getDay() === 6) {
    return 'SKIP'
  }

  const diffs = referenceDates.map((refDate) => {
    return differenceInCalendarDays(new Date(), refDate) % recurrenceInDays
  })

  const todayIsPlanningDay = diffs.some((diff) => diff === 0)

  return todayIsPlanningDay ? 'NO' : 'YES'
}

export function getZapierAnswer(answer: Answer) {
  const today = new Date()
  const formatPattern = 'yyyy-MM-dd'

  return [{ id: `${format(today, formatPattern)}--${answer}` }]
}
