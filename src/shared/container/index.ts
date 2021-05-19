import { container } from 'tsyringe'
import {
  IUsersRepository,
  UsersRepository
} from '../../modules/accounts/repositories'

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

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository
)
