import { Router } from 'express';

import EnsureAuthenticated from '@modules/users/infra/http/middlewares/EnsureAuthenticated';
import AppointmentsController from '../controllers/AppointmentsController';
import ProviderAppointmentsController from '../controllers/ProviderAppointmentsController';

const appointmentsRouter = Router();
const appointmentsController = new AppointmentsController();
const providerAppointmentsController = new ProviderAppointmentsController();

appointmentsRouter.use(EnsureAuthenticated);

appointmentsRouter.post('/', appointmentsController.create);
appointmentsRouter.get('/me', providerAppointmentsController.index);

export default appointmentsRouter;
