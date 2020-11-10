import { hash } from 'bcryptjs';

import AppError from '@shared/errors/AppError';
import Users from '@modules/users/infra/typeorm/entities/Users';
import IUsersRepository from '../repositories/IUsersRepository';

interface Request{
    name: string;
    email: string;
    password: string;
}

class CreateUserService{
    constructor(private usersRepository: IUsersRepository){}

    public async execute({name, email, password}:Request): Promise<Users>{


        const userEmailExist = await this.usersRepository.findByEmail(email);

        if (userEmailExist){
            throw new AppError('Email adress already used',401);
        }

        const hashedPassword = await hash(password, 8);

        const user = await this.usersRepository.create({
            name,
            email,
            password: hashedPassword
        });

        return user;
    }
}
export default CreateUserService;
