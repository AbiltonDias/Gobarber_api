import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import authConfig from '../config/auth';
import auth from '../config/auth';

interface TokenPayload{
    iat: number;
    exp: number;
    sub: string;
}

export default function ensureAuthenticated(
    request: Request,
    response: Response,
    next: NextFunction): void{

    const authheader =  request.headers.authorization;

    if(!authheader){
        throw new Error('JWT token is missing.');
    };

    const [, token] = authheader.split(' ');

    try{
        const decoded = verify(token, authConfig.jwt.secret);

        const { sub } = decoded as TokenPayload;

        request.user = {
            id: sub,
        };

        return next();
    }catch{
        throw new Error('Invalid JWT token');
    }
}
