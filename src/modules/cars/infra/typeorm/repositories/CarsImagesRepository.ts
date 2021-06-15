import { CreateCarsImageRequest } from '@modules/cars/dtos/CreateCarsImageRequest'
import { CarsImagesRepositoryInterface } from '@modules/cars/repositories'
import { getRepository, Repository } from 'typeorm'
import { CarImage } from '../entities/CarImage'

class CarsImagesRepository implements CarsImagesRepositoryInterface {
  private repository: Repository<CarImage>

  constructor() {
    this.repository = getRepository(CarImage)
  }

  async create({
    carId,
    imageName
  }: CreateCarsImageRequest): Promise<CarImage> {
    const carImage = this.repository.create({
      carId,
      imageName
    })

    await this.save(carImage)

    return carImage
  }

  async save(carImage: CarImage): Promise<void> {
    await this.repository.save(carImage)
  }
}

export { CarsImagesRepository }
