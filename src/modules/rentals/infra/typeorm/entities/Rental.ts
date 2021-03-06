import { Car } from '@modules/cars/infra/typeorm/entities'
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn
} from 'typeorm'
import { v4 as uuidV4 } from 'uuid'

@Entity('rentals')
class Rental {
  @PrimaryColumn()
  id: string

  @ManyToOne(() => Car)
  @JoinColumn({ name: 'carId' })
  car: Car

  @Column()
  carId: string

  @Column()
  userId: string

  @Column()
  startDate: Date

  @Column()
  endDate: Date

  @Column()
  expectedReturnDate: Date

  @Column()
  total: number

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  constructor(carId: string, userId: string, expectedReturnDate: Date) {
    if (!this.id) {
      this.id = uuidV4()
      this.carId = carId
      this.userId = userId
      this.startDate = new Date()
      this.expectedReturnDate = expectedReturnDate
    }
  }
}

export { Rental }
