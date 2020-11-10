import { Router } from 'express';
import AutheticateUserService from '@modules/users/services/AutheticateUserService';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';
import UsersReposity from '@modules/users/infra/typeorm/repositories/UsersRepository';

const sessionsRouter = Router();


sessionsRouter.post('/', async(request, response) => {

        const { email, password } = request.body;

        const usersRepository = new UsersReposity();
        const autheticateUserService = new AutheticateUserService(usersRepository);

        const { user, token } = await autheticateUserService.execute({
            email,
            password});

        delete user.password;

        return response.json({user, token});
})

export default sessionsRouter;
