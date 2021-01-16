import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import EnsureAuthenticated from '@modules/users/infra/http/middlewares/EnsureAuthenticated';
import AppointmentsController from '../controllers/AppointmentsController';
import ProviderAppointmentsController from '../controllers/ProviderAppointmentsController';

const appointmentsRouter = Router();
const appointmentsController = new AppointmentsController();
const providerAppointmentsController = new ProviderAppointmentsController();

appointmentsRouter.use(EnsureAuthenticated);

appointmentsRouter.post('/', celebrate({
  [Segments.BODY]: {
    provider_id: Joi.string().uuid().required(),
    date: Joi.date(),
  },
}), appointmentsController.create);

appointmentsRouter.get('/me', providerAppointmentsController.index);

export default appointmentsRouter;
