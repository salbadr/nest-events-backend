import { Injectable, Logger, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./user.entity";
import { Repository } from "typeorm";
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthService {
    private readonly logger = new Logger(AuthService.name);


    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private readonly jwtService: JwtService
    ) {

    }

    public getTokenForUser(user: User): string {
        const payload = { sub: user.id, username: user.username };
        return this.jwtService.sign(payload);
    }

    public async hashPassword(password: string) {
        return bcrypt.hash(password, 10);
    }
    public async authenticate(username: string, password: string) {
        const user = await this.userRepository.findOneBy({ username })
        if (!user) {
            this.logger.debug('Username not valid');
            throw new UnauthorizedException();
        }

        if (!(await bcrypt.compare(password, user.password))) {
            this.logger.debug('Password not valid');
            throw new UnauthorizedException();
        }
        return user;
    }
}