import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { TokenService } from "./token.service";
import { UserEntity } from "src/modules/users/entities/user.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([UserEntity]), AuthModule],
    controllers: [AuthController],
    providers: [AuthService, TokenService],
})
export class AuthModule {}