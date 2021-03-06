import { injectable, inject} from 'tsyringe';

import Users from '@modules/users/infra/typeorm/entities/Users';
import IMailProvider from '@shared/container/providers/MailProvider/model/IMailProvider';

import IUsersRepository from '../repositories/IUsersRepository';
import IUserTokensRepository from '../repositories/IUserTokensRepository';
import AppError from '@shared/errors/AppError';

interface IRequest{
    email: string;
}

@injectable()
class SendForgotPasswordEmailService{
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,

        @inject('UserTokensRepository')
        private userTokensRepository: IUserTokensRepository,

        @inject('MailProvider')
        private mailProvider: IMailProvider,
    ){}

    public async execute({email}: IRequest): Promise<void>{
        const user = await this.usersRepository.findByEmail(email);

        if(!user){
            throw new AppError('User does not exists');
        }

        await this.userTokensRepository.generate(user.id);

        this.mailProvider.sendMail(
            email,
            'Pedido de recuperação de senha recebido'
        );
    }
}
export default SendForgotPasswordEmailService;
