export const parseDate = dateStr => new Date(dateStr);

export const getStartOfMonth = (year, month) => new Date(year, month - 1, 1);

export const getEndOfMonth = (year, month) => new Date(year, month, 0);

export const getLastDayOfMonth = (year, month) =>
  new Date(year, month, 0).getDate();

export const getMonthName = month =>
  new Intl.DateTimeFormat('en', { month: 'long' }).format(new Date(0, month - 1));