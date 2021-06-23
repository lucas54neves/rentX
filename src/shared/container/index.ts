import { container } from 'tsyringe'

import '@shared/container/providers'

import { UsersRepository } from '@modules/accounts/infra/typeorm/repositories'
import { UsersRepositoryInterface } from '@modules/accounts/repositories'
import {
  CategoriesRepository,
  SpecificationsRepository,
  CarsImagesRepository,
  CarsRepository
} from '@modules/cars/infra/typeorm/repositories'
import {
  CarsImagesRepositoryInterface,
  CarsRepositoryInterface,
  CategoriesRepositoryInterface,
  SpecificationsRepositoryInterface
} from '@modules/cars/repositories'
import { RentalsRepository } from '@modules/rentals/infra/typeorm/repositories'
import { RentalsRepositoryInterface } from '@modules/rentals/repositories'

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

container.registerSingleton<CarsImagesRepositoryInterface>(
  'CarsImagesRepository',
  CarsImagesRepository
)

container.registerSingleton<RentalsRepositoryInterface>(
  'RentalsRepository',
  RentalsRepository
)
