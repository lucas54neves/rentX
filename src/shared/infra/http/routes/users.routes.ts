import { Router } from 'express'
import multer from 'multer'

import uploadConfig from '@config/upload'
import { ensureAuthenticated } from '@shared/infra/http/middlewares'
import { UserCreationController } from '@modules/accounts/useCases/userCreation/UserCreationController'
import { UpdateUserAvatarController } from '@modules/accounts/useCases/updateUserAvatar/UpdateUserAvatarController'

const usersRoutes = Router()

const uploadAvatar = multer(uploadConfig.upload('./tmp/avatar'))

const userCreationController = new UserCreationController()

const updateUserAvatarController = new UpdateUserAvatarController()

usersRoutes.post('/', userCreationController.handle)

usersRoutes.patch(
  '/avatar',
  ensureAuthenticated,
  uploadAvatar.single('avatar'),
  updateUserAvatarController.handle
)

export { usersRoutes }
