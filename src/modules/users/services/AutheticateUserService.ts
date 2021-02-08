import { sign } from 'jsonwebtoken';
import authConfig from '@config/auth';
import { injectable, inject } from 'tsyringe';

import User from '@modules/users/infra/typeorm/entities/Users';
import AppError from '@shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

interface Request{
    email: string;
    password: string;
}

interface Response{
    user: User;
    token: string
}

@injectable()
class AutheticateUserService{
    constructor(
        @inject('UsersRepository')
        private userRepository: IUsersRepository,

        @inject('HashProvider')
        private hashProvider: IHashProvider,
    ){}

    public async execute({ email, password }: Request): Promise<Response>{

        const user = await this.userRepository.findByEmail(email);

        if(!user){
            throw new AppError('Incorrect email/password combination.', 401);
        }

        const passwordMatched = await this.hashProvider.compareHash(password, user.password);

        if(!passwordMatched){
            throw new AppError('Incorrect email/password combination.',401);
        }

        const { secret, expiresIn } = authConfig.jwt;


        const token = sign({}, secret, {
            subject: String(user.id),
            expiresIn,
        })

        return {
            user,
            token,
        }
    }
}

export default AutheticateUserService;
