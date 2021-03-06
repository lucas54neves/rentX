import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryColumn
} from 'typeorm'
import { v4 as uuidv4 } from 'uuid'
import { Category } from './Category'
import { Specification } from './Specification'

@Entity('cars')
class Car {
  @PrimaryColumn()
  id: string

  @Column()
  name: string

  @Column()
  description: string

  @Column()
  dailyRate: number

  @Column()
  available: boolean

  @Column()
  licensePlate: string

  @Column()
  fineAmount: number

  @Column()
  brand: string

  @ManyToOne(() => Category)
  @JoinColumn({ name: 'categoryId' })
  category: Category

  @Column()
  categoryId: string

  @ManyToMany(() => Specification)
  @JoinTable({
    name: 'specificationsCars',
    joinColumns: [{ name: 'carId' }],
    inverseJoinColumns: [{ name: 'specificationId' }]
  })
  specifications: Specification[]

  @CreateDateColumn()
  createdAt: Date

  constructor(
    name: string,
    description: string,
    dailyRate: number,
    licensePlate: string,
    fineAmount: number,
    brand: string,
    categoryId: string
  ) {
    this.id = uuidv4()
    this.name = name
    this.description = description
    this.dailyRate = dailyRate
    this.available = true
    this.licensePlate = licensePlate
    this.fineAmount = fineAmount
    this.brand = brand
    this.categoryId = categoryId
    this.createdAt = new Date()
  }
}

export { Car }
