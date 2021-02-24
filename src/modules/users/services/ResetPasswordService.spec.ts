import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';
import FakeUserTokensRepository from '../repositories/fakes/FakeUserTokensRepository';
import ResetPasswordService from './ResetPasswordService';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

import AppError from '@shared/errors/AppError';

let fakeUserRepository: FakeUsersRepository;
let fakeUserTokensRepository: FakeUserTokensRepository;
let fakeHashProvider: FakeHashProvider;
//let fakeMailProvider: FakeMailProvider;
let resetPasswordService: ResetPasswordService;


describe('ResetPasswordService', () => {

    beforeEach(() => {
        fakeUserRepository = new FakeUsersRepository();
        fakeUserTokensRepository = new FakeUserTokensRepository();
        fakeHashProvider = new FakeHashProvider();

        resetPasswordService = new ResetPasswordService(
            fakeUserRepository,
            fakeUserTokensRepository,
            fakeHashProvider
        );
    })

    it('should be able to reset the password', async () => {

        const user = await fakeUserRepository.create({
            name: 'Jonh Doe',
            email: 'johndoe@email.com',
            password: '123456'
        })

        const { token } = await fakeUserTokensRepository.generate(user.id);

        const generateHash = jest.spyOn(fakeHashProvider, 'generateHash');

        await resetPasswordService.execute({
            password: '123123',
            token,
        })

        const updateUser = await fakeUserRepository.findById(user.id);

        expect(generateHash).toHaveBeenCalledWith('123123');
        expect(updateUser?.password).toBe('123123');
    });

    it('should not be able to reset the password with non-existing token', async () => {
        await expect(
            resetPasswordService.execute({
                token: 'non-existing',
                password: '123123'
            })
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should not be able to reset the password with non-existing user', async () => {
        const { token } = await fakeUserTokensRepository.generate(
            'non-existing-user',
        );

        await expect(
            resetPasswordService.execute({
                token,
                password: '123456',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should be able to reset the password if passed more than 2 hours', async () => {

        const user = await fakeUserRepository.create({
            name: 'Jonh Doe',
            email: 'johndoe@email.com',
            password: '123456',
        })

        const { token } = await fakeUserTokensRepository.generate(user.id);

        jest.spyOn(Date, 'now').mockImplementationOnce(() => {
            const customDate = new Date();

            return customDate.setHours(customDate.getHours() + 3);
        })

        await expect(
            resetPasswordService.execute({
            password: '123123',
            token,
        }),
        ).rejects.toBeInstanceOf(AppError);
    });
});


