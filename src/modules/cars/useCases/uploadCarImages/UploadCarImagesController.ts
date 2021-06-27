import { AppError } from '@shared/errors'
import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { UploadCarImagesUseCase } from './UploadCarImagesUseCase'

interface FilesInterface {
  filename: string
}

class UploadCarImageController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params

    if (request.files) {
      const images = request.files as FilesInterface[]

      const uploadCarImagesUseCase = container.resolve(UploadCarImagesUseCase)

      const fileNames = images.map((file) => file.filename)

      await uploadCarImagesUseCase.execute({
        carId: id,
        imageNames: fileNames
      })

      return response.status(201).send()
    } else {
      throw new AppError('File not found')
    }
  }
}

export { UploadCarImageController }
