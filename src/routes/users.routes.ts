import { Router } from 'express'
import { UpdateUserAvatarController } from '../modules/accounts/useCases/updateUserAvatar/UpdateUserAvatarController'
import { UserCreationController } from '../modules/accounts/useCases/userCreation/UserCreationController'
import uploadConfig from '../config/upload'
import multer from 'multer'
import { ensureAuthenticated } from '../middlewares'

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
