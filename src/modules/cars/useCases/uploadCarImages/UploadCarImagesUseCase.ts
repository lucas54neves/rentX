import { inject, injectable } from 'tsyringe'
import fs from 'fs'

import { UploadCarImagesRequest } from '@modules/cars/dtos'
import { CarsImagesRepositoryInterface } from '@modules/cars/repositories'

@injectable()
class UploadCarImagesUseCase {
  constructor(
    @inject('CarsImagesRepository')
    private carsImagesRepository: CarsImagesRepositoryInterface
  ) {}

  async execute({ carId, imageNames }: UploadCarImagesRequest) {
    imageNames.forEach(async (image) => {
      await this.carsImagesRepository.create({
        carId,
        imageName: image
      })

      await fs.promises.unlink(`./tmp/cars/${image}`)
    })
  }
}

export { UploadCarImagesUseCase }
