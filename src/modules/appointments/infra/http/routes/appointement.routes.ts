import { Router } from 'express';
import { parseISO} from 'date-fns';

import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import AppointmentsReposity from '@modules/appointments/infra/typeorm/repositories/AppointmentsRepository';

const appointmentsRouter = Router();


appointmentsRouter.use(ensureAuthenticated);

//appointmentsRouter.get('/', async(request, response) =>{
//    const appointments = await appointmentsRepository.find();
//     return response.json(appointments);
//})

appointmentsRouter.post('/', async(request, response) => {
        const { provider_id, date } = request.body;

        const parseDate = parseISO(date);

        const appointmentsRepository = new AppointmentsReposity();
        const createAppointment = new CreateAppointmentService(
            appointmentsRepository,
        );
        const appointment = await createAppointment.execute(
            { provider_id, date: parseDate });

        return response.json(appointment);

});

export default appointmentsRouter;
