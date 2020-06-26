import { Router } from 'express';
import appointmentsRouter from './appointement.routes';

const routes = Router();

routes.use('/appointments', appointmentsRouter);

export default routes;
