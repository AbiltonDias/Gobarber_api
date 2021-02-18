import { injectable, inject} from 'tsyringe';

import Users from '@modules/users/infra/typeorm/entities/Users';

import IUsersRepository from '../repositories/IUsersRepository';
import IUserTokensRepository from '../repositories/IUserTokensRepository';
import AppError from '@shared/errors/AppError';

interface IRequest{
    token: string;
    password: string;
}

@injectable()
class ResetPasswordService{
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,

        @inject('UserTokensRepository')
        private userTokensRepository: IUserTokensRepository,

    ){}

    public async execute({ token, password}: IRequest): Promise<void>{
        const userToken = await this.userTokensRepository.findByToken(token);

        if(!userToken){
            throw new AppError('User token does not exists');
        }

        const user = await this.usersRepository.findById(userToken.id);

        if(!user){
            throw new AppError('User does not exists')
        }

        user.password = password;

        await this.usersRepository.save(user);
    }
}
export default ResetPasswordService;
