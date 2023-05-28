import { Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./user.entity";
import { Repository } from "typeorm";
import { AuthService } from "./auth.service";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        @Inject(AuthService)
        private readonly authService: AuthService

    ) { }

    public async createUser(username: string, password: string, email: string) {
        const user = new User()
        user.username = username;
        user.password = await this.authService.hashPassword(password);
        user.email = email;
        await this.userRepository.save(user);
        return user;

    }
}