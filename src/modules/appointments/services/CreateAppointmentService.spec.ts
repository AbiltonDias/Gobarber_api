import FakeAppointmentRepository from '../repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from './CreateAppointmentService';
import AppError from '@shared/errors/AppError';

describe('CreateAppointment', () => {
    it('should be able to create a new appointment', async () => {
        const fakeAppointmentRepository = new FakeAppointmentRepository();
        const createAppointmentService = new CreateAppointmentService(
            fakeAppointmentRepository,
        );

        const appointment = await createAppointmentService.execute({
            date: new Date(),
            provider_id: '123456',
        })

        expect(appointment).toHaveProperty('id');
        expect(appointment.provider_id).toBe('123456');
    });

    it('should not be able to create two appointments on the same time', async () => {
        const fakeAppointmentRepository = new FakeAppointmentRepository();
        const createAppointment = new CreateAppointmentService( fakeAppointmentRepository);

        const appointmentDate = new Date();

         await createAppointment.execute({
            date: appointmentDate,
            provider_id: '123456'
        });

        await expect(createAppointment.execute({
            date: appointmentDate,
            provider_id: '123456',
        }
        )).rejects.toBeInstanceOf(AppError);

    })
})
