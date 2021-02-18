import { uuid } from 'uuidv4';

import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository';

import UserTokens from '../../infra/typeorm/entities/UserToken';

class FakeUserTokensRepository implements IUserTokensRepository{
    private userTokens: UserTokens [] = [];

    public async generate(user_id: string): Promise<UserTokens>{
        const userToken = new UserTokens();

        Object.assign(userToken, {
            id: uuid,
            token: uuid,
            user_id,
        });

        this.userTokens.push(userToken);

        return userToken;
    }

    public async findByToken(token: string): Promise<UserTokens| undefined>{
        const userToken = this.userTokens.find( findToken => findToken.token === token);

        return userToken;
    }
}

export default FakeUserTokensRepository;
