import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';
import FakeUserTokensRepository from '../repositories/fakes/FakeUserTokensRepository';
import ResetPasswordService from './ResetPasswordService';

import AppError from '@shared/errors/AppError';

let fakeUserRepository: FakeUsersRepository;
let fakeUserTokensRepository: FakeUserTokensRepository;
let fakeMailProvider: FakeMailProvider;
let resetPasswordService: ResetPasswordService;


describe('SendForgotPasswordEmail', () => {

    beforeEach(() => {
        fakeUserRepository = new FakeUsersRepository();
        fakeUserTokensRepository = new FakeUserTokensRepository();

        resetPasswordService = new ResetPasswordService(
            fakeUserRepository,
            fakeUserTokensRepository,
        );
    })

    it('should be able to reset the password', async () => {

        const user = await fakeUserRepository.create({
            name: 'Jonh Doe',
            email: 'johndoe@email.com',
            password: '123456'
        })

        const { token } = await fakeUserTokensRepository.generate(user.id);

        await resetPasswordService.execute({
            password: '123123',
            token,
        })

        const updateUser = await fakeUserRepository.findById(user.id);

        expect(updateUser?.password).toBe('123123');
    });
});


// Hash
// 2h expiração
// UserToken inexistente
// user inexistente
