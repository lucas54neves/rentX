interface DateProviderInterface {
  compareInHours(startDate: Date, endDate: Date): number
  convertToUTC(date: Date): string
  dateNow(): Date
}

export { DateProviderInterface }
