import { Router, request, response } from 'express';
import { parseISO} from 'date-fns';
import AppointmentsRepository from '../repositories/AppointmentsRepository';
import Appointment from '../models/Appointment';
import CreateAppointmentService from '../services/CreateAppointmentService';

const appointmentsRouter = Router();

const appointmentsRepository= new AppointmentsRepository();//const appointments: Appointment[] = []; Foi substituida por repository

appointmentsRouter.get('/', (request, response) =>{
    const appointment = appointmentsRepository.all();
     return response.json(appointment);
})

appointmentsRouter.post('/', (request, response) => {
    try{
        const { provider, date } = request.body;

        const parseDate = parseISO(date);

        const createAppointment = new CreateAppointmentService(appointmentsRepository);
        const appointment = createAppointment.execute({ provider, date: parseDate });

        return response.json(appointment);
    }catch(err){
        return response.status(400).json({ error: err.message});
    }
});

export default appointmentsRouter;
