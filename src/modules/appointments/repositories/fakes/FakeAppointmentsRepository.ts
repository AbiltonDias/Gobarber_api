import { uuid } from 'uuidv4';
import {isEqual} from  'date-fns';
import IAppointmentRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentsDTO';
import Appointment from '../../infra/typeorm/entities/Appointment';

class AppointmentsReposity implements IAppointmentRepository{
    private appointment: Appointment[] = [];

    public async findByDate(date: Date): Promise<Appointment | undefined>{
        const findAppointment = this.appointment.find(
            appointment => isEqual(appointment.date, date)
        );

        return findAppointment;
    }

    public async create( {
         provider_id,
          date,
         }: ICreateAppointmentDTO): Promise<Appointment>{
        const appointment = new Appointment();

        Object.assign(appointment, { id: uuid(), date, provider_id })

        this.appointment.push(appointment);

        return appointment;
    }
}
export default AppointmentsReposity;
