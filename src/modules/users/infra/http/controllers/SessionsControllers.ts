import { Request, Response} from 'express';
import { parseISO} from 'date-fns';
import { container} from 'tsyringe';
import AutheticateUserService from '@modules/users/services/AutheticateUserService';

export default class SessionsController{
    public async create(request: Request, response: Response) : Promise<Response>{
        const { email, password } = request.body;

        const autheticateUserService = container.resolve(AutheticateUserService);

        const { user, token } = await autheticateUserService.execute({
            email,
            password});

        delete user.password;

        return response.json({user, token});
    }
}
