import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import AppointmentsControllers from '../controllers/AppointmentsControllers';
import AppointmentsController from '../controllers/AppointmentsControllers';

const appointmentsRouter = Router();
const appointmentsControllers = new AppointmentsController();


appointmentsRouter.use(ensureAuthenticated);

appointmentsRouter.post('/', appointmentsControllers.create);

export default appointmentsRouter;
