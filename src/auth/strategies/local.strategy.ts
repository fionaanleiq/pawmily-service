import {PassportStrategy} from "@nestjs/passport";
import {Strategy} from "passport-local"
import { AuthService } from "../auth.service";
import { ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor (private authService: AuthService) {
        console.log('test')
        super({ usernameField: 'emailAddress', passwordField: 'password' });
    }

    async validate(emailAddress: string, password: string) : Promise<any> {
        console.log('local-strategy')
        const user = await this.authService.validateUser({emailAddress, password});
        if (!user) throw new UnauthorizedException('Invalid Credentials');
        return user;
    }
}