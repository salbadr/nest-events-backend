import { Controller, Post, Request, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiBody, ApiProperty } from "@nestjs/swagger";

export interface Login {
    username: string;
    password: string;
}
@Controller('/auth')
export class AuthController {

    @Post('login')
    @ApiProperty({name: 'username'})
    @ApiBody({description: "body:any someMethod"})
    @UseGuards(AuthGuard('local'))
    public login(@Request() request){
        return {
            userId: request.user.id,
            token: 'the token will go here'
        }

    }
}