import UserTokens from '../infra/typeorm/entities/UserToken';

export default interface IUserTokensReporitory{
    generate(user_id: string): Promise<UserTokens>;
    findByToken( token: string): Promise<UserTokens|undefined>;
}
