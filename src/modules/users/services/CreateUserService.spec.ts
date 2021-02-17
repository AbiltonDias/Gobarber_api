import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import CreateUserService from './CreateUserService';
import AppError from '@shared/errors/AppError';

describe('CreateUser', () => {
    it('should be able to create a new user', async () => {
        const fakeUserRepository = new FakeUsersRepository();
        const fakeHashProvider = new FakeHashProvider();

        const createUserService = new CreateUserService(
            fakeUserRepository,
            fakeHashProvider,
        );

        const user = await createUserService.execute({
            name: 'John Doe',
            email: 'johndoe@email.com',
            password: '123456'
        })

        expect(user).toHaveProperty('id');
    });

    it('should not be able to create a new user with same email from another', async () => {
        const fakeUsersRepository = new FakeUsersRepository();
        const fakeHashProvider = new FakeHashProvider();

        const createUser = new CreateUserService(
            fakeUsersRepository,
            fakeHashProvider);

        await createUser.execute({
            name: 'John Doe',
            email: 'johndoe@email.com',
            password: '123456'
        });

        await expect(
            createUser.execute({
                name: 'John Doe',
                email: 'johndoe@email.com',
                password: '123456'
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
})
