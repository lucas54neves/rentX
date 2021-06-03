import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm'
import { v4 as uuidv4 } from 'uuid'

@Entity('users')
class User {
  @PrimaryColumn()
  id: string

  @Column()
  name: string

  @Column()
  username: string

  @Column()
  email: string

  @Column()
  password: string

  @Column()
  driverLicense: string

  @Column()
  isAdmin: boolean

  @Column()
  avatar: string

  @CreateDateColumn()
  createdAt: Date

  constructor(
    name: string,
    username: string,
    email: string,
    password: string,
    driverLicense: string,
    avatar: string
  ) {
    this.id = uuidv4()
    this.name = name
    this.username = username
    this.email = email
    this.password = password
    this.driverLicense = driverLicense
    this.isAdmin = false
    this.createdAt = new Date()
    this.avatar = avatar
  }
}

export { User }
