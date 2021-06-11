import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm'
import { v4 as uuidv4 } from 'uuid'

@Entity('specifications')
export class Specification {
  @PrimaryColumn()
  id: string

  @Column()
  name: string

  @Column()
  description: string

  @CreateDateColumn()
  createdAt: Date

  constructor(name: string, description: string) {
    this.id = uuidv4()
    this.name = name
    this.description = description
    this.createdAt = new Date()
  }
}
