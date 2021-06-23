import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn
} from 'typeorm'
import { v4 as uuidV4 } from 'uuid'

@Entity('rentals')
class Rental {
  @PrimaryColumn()
  id: string

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
      this.expectedReturnDate = expectedReturnDate
    }
  }
}

export { Rental }
