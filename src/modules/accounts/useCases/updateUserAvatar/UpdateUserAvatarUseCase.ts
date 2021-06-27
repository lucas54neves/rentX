import { inject, injectable } from 'tsyringe'

import { AppError } from '@shared/errors'
import { UpdateUserAvatarRequest } from '@modules/accounts/dtos'
import { UsersRepositoryInterface } from '@modules/accounts/repositories'
import { deleteFile } from '@utils'

@injectable()
class UpdateUserAvatarUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: UsersRepositoryInterface
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
