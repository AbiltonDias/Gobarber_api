import { Router } from 'express';
import AutheticateUserService from '@modules/users/services/AutheticateUserService';

import { container } from 'tsyringe';


const sessionsRouter = Router();


sessionsRouter.post('/', async(request, response) => {

        const { email, password } = request.body;

        const autheticateUserService = container.resolve(AutheticateUserService);

        const { user, token } = await autheticateUserService.execute({
            email,
            password});

        delete user.password;

        return response.json({user, token});
})

export default sessionsRouter;
