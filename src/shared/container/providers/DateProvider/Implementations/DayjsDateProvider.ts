import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

import { DateProviderInterface } from '../DateProviderInterface'

dayjs.extend(utc)

class DayjsDateProvider implements DateProviderInterface {
  compareInHours(startDate: Date, endDate: Date): number {
    const startDateUTC = this.convertToUTC(startDate)

    const endDateUTC = this.convertToUTC(endDate)

    return dayjs(endDateUTC).diff(startDateUTC, 'hours')
  }

  convertToUTC(date: Date): string {
    return dayjs(date).utc().local().format()
  }

  dateNow(): Date {
    return dayjs().toDate()
  }
}

export { DayjsDateProvider }
