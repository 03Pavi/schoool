import dayjs from 'dayjs'

// Simple and reusable date formatter using dayjs
export const formatDate = (date: string | Date, format = 'DD MMM YYYY') => {
  return dayjs(date).format(format)
}
