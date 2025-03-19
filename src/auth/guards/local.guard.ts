import { BadRequestException, ExecutionContext, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { AuthGuard } from "@nestjs/passport";
import { plainToClass } from "class-transformer";
import { Observable } from "rxjs";
import { ACCESS_SECRET_KEY } from "src/config/constants.config";
import { AuthLoginRequestDto } from "../dto/request/auth-login-request.dto";
import { validate } from "class-validator";

@Injectable()
export class LocalGuard extends AuthGuard('local') {
    async canActivate(context: ExecutionContext): Promise<boolean> {
        // const ctx = context.switchToHttp();
        // const request = ctx.getRequest();

        // const body = plainToClass(AuthLoginRequestDto, request.body);
        // const errors = await validate(body);

        // const errorMessages = errors.flatMap(({ constraints }) => constraints ? Object.values(constraints) : null)
        // if (errorMessages.length) throw new BadRequestException(`Error messages: ${errorMessages.join(' ')}`);

        // console.log('test')
        return super.canActivate(context) as boolean | Promise<boolean>;
    }
}