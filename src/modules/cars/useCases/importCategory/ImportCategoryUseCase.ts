import csvParse from 'csv-parse'
import fs from 'fs'
import { inject, injectable } from 'tsyringe'

import { ImportCategoryRequest } from '@modules/cars/dtos'
import { ICategoriesRepository } from '@modules/cars/repositories'

@injectable()
class ImportCategoryUseCase {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository
  ) {}

  loadCategories(file: Express.Multer.File): Promise<ImportCategoryRequest[]> {
    return new Promise((resolve, reject) => {
      const categories: ImportCategoryRequest[] = []

      const stream = fs.createReadStream(file.path)

      const parseFile = csvParse()

      stream.pipe(parseFile)

      parseFile
        .on('data', async (line: any) => {
          const [name, description] = line

          categories.push({
            name,
            description
          })
        })
        .on('end', () => {
          fs.promises.unlink(file.path)
          resolve(categories)
        })
        .on('error', (err: any) => {
          reject(err)
        })
    })
  }

  async execute(file: Express.Multer.File): Promise<void> {
    const categories = await this.loadCategories(file)

    categories.forEach(async (category) => {
      const { name, description } = category

      const existCategory = await this.categoriesRepository.findByName(name)

      if (!existCategory) {
        await this.categoriesRepository.create({
          name,
          description
        })
      }
    })
  }
}

export { ImportCategoryUseCase }
