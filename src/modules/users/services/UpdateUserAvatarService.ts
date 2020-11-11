import path from 'path';
import fs from 'fs';
import { injectable, inject } from 'tsyringe';

import uploadConfig from '@config/uploads';
import Users from '@modules/users/infra/typeorm/entities/Users';
import AppError from '@shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';

interface Request{
    user_id: string;
    avatarFilename: string;
}

@injectable()
class UpdateUserAvatarService{
    constructor(
        @inject('UsersRepository')
        private userRepository: IUsersRepository
    ){}

    public async execute({user_id, avatarFilename}: Request): Promise<Users> {
        const user = await this.userRepository.findById(user_id);

        if(!user){
            throw new AppError('Only authenticated users can change avatar',401);
        }

        if(user.avatar){
            const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);
            const userAvatarFileExists = fs.promises.stat(userAvatarFilePath);

            if(userAvatarFileExists){
                await fs.promises.unlink(userAvatarFilePath);
            }
        }

        user.avatar = avatarFilename;
        await this.userRepository.save(user);

        return user;
    }
};

export default UpdateUserAvatarService;