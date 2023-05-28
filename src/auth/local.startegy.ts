import { Inject, Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "./auth.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {

    constructor(
        @Inject(AuthService)
        private authService: AuthService
    ) {
        super()
    }

    public async validate(username: string, password: string) {
        return this.authService.authenticate(username, password);
    }
}