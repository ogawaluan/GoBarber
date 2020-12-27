import { Router } from 'express';
import multer from 'multer';

import UsersController from '../controllers/UsersController';
import UserAvatarController from '../controllers/UserAvatarController';
import uploadConfig from '@config/upload';
import EnsureAuthenticated from '../middlewares/EnsureAuthenticated';

const usersRouter = Router();
const upload = multer(uploadConfig);
const usersController = new UsersController();
const userAvatarController = new UserAvatarController();

usersRouter.post('/', usersController.create);

usersRouter.patch('/avatar', EnsureAuthenticated, upload.single('avatar'), userAvatarController.update);

export default usersRouter;
