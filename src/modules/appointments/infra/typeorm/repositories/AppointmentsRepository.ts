import { getRepository, Repository} from 'typeorm';

import IAppointmentRepository from '../../../repositories/IAppointmentsRepository';
import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentsDTO';

class AppointmentsReposity implements IAppointmentRepository{
    private ormRepository: Repository<Appointment>;

    constructor(){
        this.ormRepository = getRepository(Appointment);
    }

    public async findByDate(date: Date): Promise<Appointment | undefined>{

        const findAppointment = await this.ormRepository.findOne({
            where:{ date }, // Poderia ser date: date, date da tabela for igual ao date que estou recebendo como parâmetro;
        });

        return findAppointment;
    }

    public async create( { provider_id, date }: ICreateAppointmentDTO): Promise<Appointment>{
        const appointment = this.ormRepository.create({ provider_id, date});

        await this.ormRepository.save(appointment);
        return appointment;
    }
}
export default AppointmentsReposity;
