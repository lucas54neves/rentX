import { CreateCarsImageRequest } from '../dtos/CreateCarsImageRequest'
import { CarImage } from '../infra/typeorm/entities/CarImage'

interface CarsImagesRepositoryInterface {
  create(data: CreateCarsImageRequest): Promise<CarImage>
  save(carImage: CarImage): Promise<void>
}

export { CarsImagesRepositoryInterface }
