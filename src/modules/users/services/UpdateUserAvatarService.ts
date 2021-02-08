import path from 'path';
import fs from 'fs';
import { injectable, inject } from 'tsyringe';

import uploadConfig from '@config/uploads';
import Users from '@modules/users/infra/typeorm/entities/Users';
import AppError from '@shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';

interface Request{
    user_id: string;
    avatarFilename: string;
}

@injectable()
class UpdateUserAvatarService{
    constructor(
        @inject('UsersRepository')
        private userRepository: IUsersRepository,

        @inject('StorageProvider')
        private storageProvider: IStorageProvider
    ){}

    public async execute({user_id, avatarFilename}: Request): Promise<Users> {
        const user = await this.userRepository.findById(user_id);

        if(!user){
            throw new AppError('Only authenticated users can change avatar',401);
        }

        if(user.avatar){
            await this.storageProvider.deleteFile(user.avatar);
        }

        const fileName = await this.storageProvider.saveFile(avatarFilename);

        user.avatar = fileName;

        await this.userRepository.save(user);

        return user;
    }
};

export default UpdateUserAvatarService;
