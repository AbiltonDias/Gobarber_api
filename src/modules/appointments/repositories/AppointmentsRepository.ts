import { EntityRepository, Repository} from 'typeorm';

import Appointment from '../models/Appointment';


@EntityRepository(Appointment)
class AppointmentsReposity extends Repository<Appointment>{

    public async findByDate(date: Date): Promise<Appointment | null>{

        const findAppointment = await this.findOne({
            where:{ date }, // Poderia ser date: date, date da tabela for igual ao date que estou recebendo como parâmetro;
        });

        return findAppointment || null;
    }
}
export default AppointmentsReposity;
