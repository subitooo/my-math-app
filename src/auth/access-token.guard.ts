import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import * as jwt from "jsonwebtoken";

@Injectable()
export class AccessTokenGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest(); // текущий HTTP запрос

        const authHeader = request.headers.authorization;

        if (!authHeader) {
            throw new UnauthorizedException("Не найден токен")
        }

        const [type, token] = authHeader.split(" ");

        if (type != "Bearer" || !token) {
            throw new UnauthorizedException("Неверный формат токена");
        }

        try {   // Проверка токена
            const payload = jwt.verify(
                token,
                process.env.JWT_ACCESS_SECRET!,
            ) as any;

            request.user =  payload.userId; // добавляем новое поле user в объект запроса

            return true;
        }   catch (error) {
            throw new UnauthorizedException("Неверный или просроченный токен");
        }
    }
}
