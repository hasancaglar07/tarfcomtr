export const DEFAULT_EVENTS_TIME_ZONE = 'Europe/Istanbul'

function getDatePartsInTimeZone(date: Date, timeZone: string) {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(date)

  const year = Number(parts.find((p) => p.type === 'year')?.value)
  const month = Number(parts.find((p) => p.type === 'month')?.value)
  const day = Number(parts.find((p) => p.type === 'day')?.value)

  if (!year || !month || !day) {
    throw new Error('Failed to resolve date parts for time zone')
  }

  return { year, month, day }
}

// Returns a Date at 00:00:00.000Z for "today" in the given time zone.
// This matches how `eventDate` is stored (date input -> YYYY-MM-DD -> UTC midnight).
export function getEventsTodayStart(timeZone: string = DEFAULT_EVENTS_TIME_ZONE, now: Date = new Date()) {
  const { year, month, day } = getDatePartsInTimeZone(now, timeZone)
  return new Date(Date.UTC(year, month - 1, day, 0, 0, 0, 0))
}

