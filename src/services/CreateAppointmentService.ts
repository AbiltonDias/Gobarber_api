import Appointment from '../models/Appointment';
import {startOfHour} from 'date-fns';
import AppointmentsReposity from '../repositories/AppointmentsRepository';


interface Request{
    provider: string;
    date: Date;
}

class CreateAppointmentService{
    private appointmentsRepository:AppointmentsReposity;

    constructor(appointmentsRepository:AppointmentsReposity){
        this.appointmentsRepository = appointmentsRepository;
    }

    public execute({provider, date}:Request): Appointment{
        const appointmentDate = startOfHour(date);

    const findAppointmentInSameDate = this.appointmentsRepository
        .findByDate(appointmentDate);

    if(findAppointmentInSameDate){
        throw new Error("This appointment is already booked");
    }

    const appointment = this.appointmentsRepository.create({
        provider,
        date: appointmentDate
    });

        return appointment;
    }

}
export default CreateAppointmentService;
