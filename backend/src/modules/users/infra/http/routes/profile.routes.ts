import { Router } from 'express';

import ProfileController from '../controllers/ProfileController';
import EnsureAuthenticated from '../middlewares/EnsureAuthenticated';

const profileRouter = Router();
const profileController = new ProfileController();

profileRouter.use(EnsureAuthenticated);

profileRouter.get('/', profileController.show);
profileRouter.put('/', profileController.update);

export default profileRouter;
