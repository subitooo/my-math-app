import { Injectable } from "@nestjs/common";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

@Injectable()
export class TokenService {
    generateTokens(userId: string) {
        if (!process.env.JWT_ACCESS_SECRET || !process.env.ACCESS_TOKEN_TTL)
            throw new Error('JWT_ACCESS_SECRET or ACCESS_TOKEN_TTL not defined');
        if (!process.env.JWT_REFRESH_SECRET || !process.env.REFRESH_TOKEN_TTL)
            throw new Error('JWT_REFRESH_SECRET or REFRESH_TOKEN_TTL not defined');

        const accessToken = (jwt.sign as any)(  // генерируем токен
            { userId },
            process.env.JWT_ACCESS_SECRET!,
            { expiresIn: process.env.ACCESS_TOKEN_TTL! },
        );

        const refreshToken = (jwt.sign as any)(
            { userId },
            process.env.JWT_REFRESH_SECRET!,
            { expiresIn: process.env.REFRESH_TOKEN_TTL! }
        );

        return { accessToken, refreshToken };
    }

    async hashRefreshToken(refreshToken: string) {
        return bcrypt.hash(refreshToken, 10);
    }
}
