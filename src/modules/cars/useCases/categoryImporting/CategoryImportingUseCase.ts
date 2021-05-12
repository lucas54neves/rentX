import csvParse from 'csv-parse'
import fs from 'fs'

import { CategoryImportingRequest } from '../../dtos'
import { ICategoriesRepository } from '../../repositories'

export class CategoryImportingUseCase {
  constructor(private categoriesRepository: ICategoriesRepository) {}

  loadCategories(
    file: Express.Multer.File
  ): Promise<CategoryImportingRequest[]> {
    return new Promise((resolve, reject) => {
      const categories: CategoryImportingRequest[] = []

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

    categories.map((category) => {
      const { name, description } = category

      const existCategory = this.categoriesRepository.findByName(name)

      if (!existCategory) {
        this.categoriesRepository.create({
          name,
          description
        })
      }
    })
  }
}
