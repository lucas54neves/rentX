import { container } from 'tsyringe'

import { UsersRepository } from '@modules/accounts/infra/typeorm/repositories/UsersRepository'
import { IUsersRepository } from '@modules/accounts/repositories'
import {
  CategoriesRepository,
  SpecificationsRepository
} from '@modules/cars/infra/typeorm/repositories'
import {
  CarsRepositoryInterface,
  ICategoriesRepository,
  ISpecificationsRepository
} from '@modules/cars/repositories'
import { CarsRepository } from '@modules/cars/infra/typeorm/repositories/CarsRepository'

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

container.registerSingleton<CarsRepositoryInterface>(
  'CarsRepository',
  CarsRepository
)
