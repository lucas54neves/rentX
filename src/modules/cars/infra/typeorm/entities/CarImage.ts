import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm'
import { v4 as uuidV4 } from 'uuid'

@Entity('carsImage')
class CarImage {
  @PrimaryColumn()
  id: string

  @Column()
  carId: string

  @Column()
  imageName: string

  @CreateDateColumn()
  createdAt: Date

  constructor(carId: string, imageName: string) {
    this.id = uuidV4()
    this.carId = carId
    this.imageName = imageName
    this.createdAt = new Date()
  }
}

export { CarImage }
