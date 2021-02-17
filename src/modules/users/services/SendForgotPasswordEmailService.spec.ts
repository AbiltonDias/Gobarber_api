import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';
import FakeUserTokensRepository from '../repositories/fakes/FakeUserTokensRepository';

import SendForgot from './SendForgotPasswordEmailService';
import AppError from '@shared/errors/AppError';
import SendForgotPasswordEmailService from './SendForgotPasswordEmailService';

let fakeUserRepository: FakeUsersRepository;
let fakeUserTokensRepository: FakeUserTokensRepository;
let fakeMailProvider: FakeMailProvider;
let sendForgotPasswordEmail: SendForgotPasswordEmailService;

describe('SendForgotPasswordEmail', () => {

    beforeEach(() => {
        fakeUserRepository = new FakeUsersRepository();
        fakeMailProvider = new FakeMailProvider();
        fakeUserTokensRepository = new FakeUserTokensRepository();

        sendForgotPasswordEmail = new SendForgot(
            fakeUserRepository,
            fakeUserTokensRepository,
            fakeMailProvider,
        );
    })

    it('should be able to recover the password using the email', async () => {

        const sendEmail = jest.spyOn(fakeMailProvider, 'sendMail');

        await fakeUserRepository.create({
            name: 'Jonh Doe',
            email: 'johndoe@email.com',
            password: '123456'
        })

        await sendForgotPasswordEmail.execute({
            email: 'johndoe@email.com',
        })

        expect(sendEmail).toHaveBeenCalled();
    });

    it('should not be able to recover a non-existing user password', async () => {

        await expect(
            sendForgotPasswordEmail.execute({
                email: 'johndoe@email.com',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should generate a forgot password token', async () => {

        const generateToken = jest.spyOn( fakeUserTokensRepository, 'generate');

        const user = await fakeUserRepository.create({
            name: 'Jonh Doe',
            email: 'johndoe@email.com',
            password: '123456'
        })

        await sendForgotPasswordEmail.execute({
            email: 'johndoe@email.com',
        })

        expect(generateToken).toHaveBeenCalledWith(user.id);
    })
});
