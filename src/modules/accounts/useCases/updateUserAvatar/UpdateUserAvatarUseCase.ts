import { inject, injectable } from 'tsyringe'
import { AppError } from '../../../../errors'
import { deleteFile } from '../../../../utils/file'
import { UpdateUserAvatarRequest } from '../../dtos'
import { IUsersRepository } from '../../repositories'

@injectable()
class UpdateUserAvatarUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  async execute({
    userId,
    avatarFile
  }: UpdateUserAvatarRequest): Promise<void> {
    const user = await this.usersRepository.findById(userId)

    if (!user) {
      throw new AppError('User does not exists', 401)
    }

    if (user.avatar) {
      await deleteFile(`./tmp/avatar/${user.avatar}`)
    }

    user.avatar = avatarFile

    await this.usersRepository.save(user)
  }
}

export { UpdateUserAvatarUseCase }
