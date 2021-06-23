import { container } from 'tsyringe'
import { DateProviderInterface } from './DateProvider/DateProviderInterface'
import { DayjsDateProvider } from './DateProvider/Implementations/DayjsDateProvider'

container.registerSingleton<DateProviderInterface>(
  'DayjsDateProvider',
  DayjsDateProvider
)
