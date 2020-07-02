import { Router } from 'express';
import AutheticateUserService from '../services/AutheticateUserService';

const sessionsRouter = Router();

sessionsRouter.post('/', async(request, response) => {

        const { email, password } = request.body;

        const autheticateUserService = new AutheticateUserService();

        const { user, token } = await autheticateUserService.execute({
            email,
            password});

        delete user.password;

        return response.json({user, token});
})

export default sessionsRouter;
