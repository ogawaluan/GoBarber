import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import EnsureAuthenticated from '@modules/users/infra/http/middlewares/EnsureAuthenticated';
import ProvidersController from '../controllers/ProvidersController';
import ProviderDayAvailabilityController from '../controllers/ProviderDayAvailabilityController';
import ProviderMonthAvailabilityController from '../controllers/ProviderMonthAvailabilityController';

const providersRouter = Router();
const appointmentsController = new ProvidersController();
const providerDayAvailabilityController = new ProviderDayAvailabilityController();
const providerMonthAvailabilityController = new ProviderMonthAvailabilityController();

providersRouter.use(EnsureAuthenticated);

providersRouter.get('/', appointmentsController.index);

providersRouter.get('/:provider_id/day-availability', celebrate({
  [Segments.PARAMS]: {
    provider_id: Joi.string().uuid().required(),
  },
}), providerDayAvailabilityController.index);

providersRouter.get('/:provider_id/month-availability', celebrate({
  [Segments.PARAMS]: {
    provider_id: Joi.string().uuid().required(),
  },
}), providerMonthAvailabilityController.index);

export default providersRouter;
