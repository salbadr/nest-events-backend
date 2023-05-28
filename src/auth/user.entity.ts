import { Field, ObjectType } from "@nestjs/graphql";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('user')
@ObjectType()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @Field()
    username: string;

    @Column()
    password: string;

    @Column()
    @Field()
    email: string;

}