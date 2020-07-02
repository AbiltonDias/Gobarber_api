import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';

import AppError from '../errors/AppError';
import Users from '../models/Users';

interface Request{
    name: string;
    email: string;
    password: string;
}

class CreateUserService{
    public async execute({name, email, password}:Request): Promise<Users>{
        const usersRepository = getRepository(Users);

        const userEmailExist = await usersRepository.findOne({
            where: { email },
        });

        if (userEmailExist){
            throw new AppError('Email adress already used',401);
        }

        const hashedPassword = await hash(password, 8);

        const user = usersRepository.create({
            name,
            email,
            password: hashedPassword
        });

        await usersRepository.save(user);

        return user;
    }
}
export default CreateUserService;
