interface DateProviderInterface {
  compareInHours(startDate: Date, endDate: Date): number
  convertToUTC(date: Date): string
  dateNow(): Date
  compareInDays(startDate: Date, endDate: Date): number
  add48HoursToNow(): Date
  addDays(days: number): Date
}

export { DateProviderInterface }
