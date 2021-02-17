import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import AutheticationUserService from './AutheticateUserService';
import CreateUserService from './CreateUserService';



describe('AutheticateUser', () => {
    it('should be able to autheticate', async () => {
        const fakeUserRepository = new FakeUsersRepository();
        const fakeHashProvider = new FakeHashProvider();

        const authenticateUser = new AutheticationUserService(
            fakeUserRepository,
            fakeHashProvider);
        const createUser = new CreateUserService(
            fakeUserRepository,
            fakeHashProvider
        );

        await createUser.execute({
            name: 'John Doe',
            email: 'johndoe@email.com',
            password: '123456',
        });

        const response = await authenticateUser.execute({
            email: 'johndoe@email.com',
            password: '123456',
        });

        expect(response).toHaveProperty('token');
    });

    it('should not be able to authenticate with non existing user', async() => {
        const fakeUserRepository = new FakeUsersRepository();
        const fakeHashProvider = new FakeHashProvider();

        const authenticateUser = new AutheticationUserService(
            fakeUserRepository,
            fakeHashProvider,
        );

        await expect(
            authenticateUser.execute({
                email: 'johndoe@email.com',
                password: '123456',
            })
        ).rejects.toBeInstanceOf(AppError);
    })

    it('should not be able to autheticate with wrong password', async () => {
        const fakeUserRepository = new FakeUsersRepository();
        const fakeHashProvider = new FakeHashProvider();

        const authenticateUser = new AutheticationUserService(
            fakeUserRepository,
            fakeHashProvider);
        const createUser = new CreateUserService(
            fakeUserRepository,
            fakeHashProvider
        );

        await createUser.execute({
            name: 'John Doe',
            email: 'johndoe@email.com',
            password: '123456',
        });

        await expect(authenticateUser.execute({
            email: 'johndoe@email.com',
            password: 'wrong-password',
        })).rejects.toBeInstanceOf(AppError);
    });


})
