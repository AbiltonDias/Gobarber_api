import {startOfHour} from 'date-fns';

import AppError from '@shared/errors/AppError';
import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import IAppointmentRepository from '../repositories/IAppointmentsRepository';


interface IRequest{
    provider_id: string;
    date: Date;
}

class CreateAppointmentService{
    constructor(private appointementsRepository: IAppointmentRepository){}

    public async execute({provider_id, date}:IRequest): Promise<Appointment>{
        const appointmentDate = startOfHour(date);

        const findAppointmentInSameDate = await this.appointementsRepository
            .findByDate(appointmentDate);

        if(findAppointmentInSameDate){
         throw new AppError("This appointment is already booked");
        }

        const appointment = await this.appointementsRepository.create({
            provider_id,
            date: appointmentDate
        });

        return appointment;
    }

}
export default CreateAppointmentService;
