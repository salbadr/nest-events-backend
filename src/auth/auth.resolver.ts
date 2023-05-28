import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { TokenOutput } from "./token.output";
import { AuthService } from "./auth.service";
import { LoginInput } from "./login.input";

@Resolver(() => TokenOutput)
export class AuthResolver {

    constructor(
        private readonly authService: AuthService
    ) { }

    @Mutation(() => TokenOutput, { name: 'login' })
    public async login(
        @Args({ name: 'input', type: () => LoginInput })
        input: LoginInput
    ) {
        return new TokenOutput(this.authService.getTokenForUser(
            await this.authService.authenticate(input.username, input.password)
        ))
    }
}