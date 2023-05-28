import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./user.entity";
import { LocalStrategy } from "./local.startegy";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { JwtModule } from "@nestjs/jwt";
import { AuthResolver } from "./auth.resolver";
import { UserService } from "./user.service";
import { UserResolver } from "./user.resolver";
import { JwtStrategy } from "./jwt.strategy";

@Module({
    imports: [
        JwtModule.register({
            global: true,
            secret: 'THIS IS A SECRET',
            signOptions: { expiresIn: '60m' },
        }),
        TypeOrmModule.forFeature([User])],
    providers: [LocalStrategy, JwtStrategy, AuthService, AuthResolver, UserService, UserResolver],
    controllers: [AuthController]
})
export class AuthModule {


}