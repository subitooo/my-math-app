import { Injectable, UnauthorizedException } from "@nestjs/common";
import {TokenService } from "./token.service";
import bcrypt from "bcrypt";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "src/modules/users/entities/user.entity";
import { Repository } from "typeorm";
import * as jwt from "jsonwebtoken";

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepo: Repository<UserEntity>,
        private readonly tokenService: TokenService
    ) {}

        async login(login: string, password: string) {
            const userEntity = await this.userRepo.findOne({
                where: { login },
            });
            

            if (!userEntity) {
                throw new UnauthorizedException("Invalid credentials");
            }

            const isPasswordValid = await bcrypt.compare(
                password,
                userEntity.passwordHash,
            );
            
            if (!isPasswordValid) {
                throw new UnauthorizedException("Invalid credentials");
            }

            const tokens = this.tokenService.generateTokens(userEntity.id);

            const refreshTokenHash = 
                await this.tokenService.hashRefreshToken(tokens.refreshToken);

            userEntity.refreshTokenHash = refreshTokenHash;

            await this.userRepo.save(userEntity);

            return tokens;
        }

        async refresh(refreshToken: string) {
            if (!process.env.JWT_REFRESH_SECRET)
                throw new Error("JWT_REFRESH_SECRET not defined");

            if (!refreshToken) {
                throw new UnauthorizedException();
            }

            const payload = jwt.verify(     // проверяем токен
                refreshToken,
                process.env.JWT_REFRESH_SECRET,
            ) as any;

            const user = await this.userRepo.findOne({
                where: { id: payload.userId },
            });

            if (!user || !user.refreshTokenHash) {
                throw new UnauthorizedException();
            }

            const isRefreshTokenValid = await bcrypt.compare(
                refreshToken,
                user.refreshTokenHash,
            );

            if (!isRefreshTokenValid) {
                throw new UnauthorizedException();
            }

            const tokens = this.tokenService.generateTokens(user.id);

            const newRefreshTokenHash = 
                await this.tokenService.hashRefreshToken(tokens.refreshToken);

            user.refreshTokenHash = newRefreshTokenHash;
            await this.userRepo.save(user);

            return tokens;
        }

        async logout(userId: string) {
            const user = await this.userRepo.findOne({
                where: {id : userId },
            });

            if (!user) return;

            user.refreshTokenHash = null;

            await this.userRepo.save(user);
        }

        async getMe(userId: string) {
            const user = await this.userRepo.findOne({
                where: {id: userId},
            });

            if (!user) {
                throw new UnauthorizedException();
            }

            return {
                id: user.id,
                login: user.login,
                createdAt: user.createdAt,
            };
        }
    }