
import { injectable, inject} from 'tsyringe';

import AppError from '@shared/errors/AppError';
import Users from '@modules/users/infra/typeorm/entities/Users';
import IUsersRepository from '../repositories/IUsersRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

interface Request{
    name: string;
    email: string;
    password: string;
}

@injectable()
class CreateUserService{
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,

        @inject('HashProvider')
        private hashProvider: IHashProvider,
    ){}

    public async execute({name, email, password}:Request): Promise<Users>{


        const userEmailExist = await this.usersRepository.findByEmail(email);

        if (userEmailExist){
            throw new AppError('Email adress already used',401);
        }

        const hashedPassword = await this.hashProvider.generateHash(password);

        const user = await this.usersRepository.create({
            name,
            email,
            password: hashedPassword
        });

        return user;
    }
}
export default CreateUserService;
