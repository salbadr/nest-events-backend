import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class TokenOutput {
    constructor(token: string) {
        this.token = token
    }

    @Field()
    token: string;
}