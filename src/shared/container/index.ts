import { container } from 'tsyringe'

import { UsersRepository } from '@modules/accounts/infra/typeorm/repositories/UsersRepository'
import { UsersRepositoryInterface } from '@modules/accounts/repositories'
import {
  CategoriesRepository,
  SpecificationsRepository
} from '@modules/cars/infra/typeorm/repositories'
import {
  CarsRepositoryInterface,
  CategoriesRepositoryInterface,
  SpecificationsRepositoryInterface
} from '@modules/cars/repositories'
import { CarsRepository } from '@modules/cars/infra/typeorm/repositories/CarsRepository'
import { CarsImagesRepository } from '@modules/cars/infra/typeorm/repositories/CarsImagesRepository'

container.registerSingleton<CategoriesRepositoryInterface>(
  'CategoriesRepository',
  CategoriesRepository
)

container.registerSingleton<SpecificationsRepositoryInterface>(
  'SpecificationsRepository',
  SpecificationsRepository
)

container.registerSingleton<UsersRepositoryInterface>(
  'UsersRepository',
  UsersRepository
)

container.registerSingleton<CarsRepositoryInterface>(
  'CarsRepository',
  CarsRepository
)

container.registerSingleton<CarsImagesRepository>(
  'CarsImagesRepository',
  CarsImagesRepository
)
