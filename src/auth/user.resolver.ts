import { Inject } from "@nestjs/common";
import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { UserService } from "./user.service";
import { User } from "./user.entity";
import { UserInput } from "./user.input";

@Resolver()
export class UserResolver {
    constructor(
        @Inject(UserService)
        private readonly userService: UserService
    ) { }

    @Mutation(() => User, { name: 'register' })
    public async register(
        @Args({ name: 'input', type: () => UserInput })
        input: UserInput
    ) {
        return this.userService.createUser(input.username, input.password, input.email)
    }
}