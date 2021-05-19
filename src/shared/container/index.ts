import { container } from 'tsyringe'

import {
  ICategoriesRepository,
  CategoriesRepository,
  ISpecificationsRepository,
  SpecificationsRepository
} from '../../modules/cars/repositories/'

container.registerSingleton<ICategoriesRepository>(
  'CategoriesRepository',
  CategoriesRepository
)

container.registerSingleton<ISpecificationsRepository>(
  'SpecificationsRepository',
  SpecificationsRepository
)
