import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '@config/uploads';

import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';
import CreateUserService from '@modules/users/services/CreateUserService';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';

const usersRouter = Router();
const upload = multer(uploadConfig);


usersRouter.post('/', async(request, response) => {
    try{
        const { name, email, password } = request.body;
        const usersRepository = new UsersRepository();
        const createUserService = new CreateUserService(usersRepository);

        const user = await createUserService.execute({
            name,
            email,
            password
        });

        delete user.password;

        return response.json(user);
    }catch(err){
        return response.status(400).json({ error: err.message});
    }
});

usersRouter.patch(
    '/avatar',
    ensureAuthenticated,
    upload.single('avatar'),
    async (request, response) =>{
            const usersRepository = new UsersRepository();
            const updateUserAvatarService = new UpdateUserAvatarService(usersRepository);

            const user = await updateUserAvatarService.execute({
                user_id: request.user.id,
                avatarFilename: request.file.filename,
            });

            delete user.password;
            return response.json(user);
    },
);

export default usersRouter;
