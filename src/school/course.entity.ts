import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Subject } from "./subject.entity";
import { Teacher } from "./teacher.entity";

@Entity('course')
@ObjectType()
export class Course {

    @PrimaryGeneratedColumn()
    @Field(() => Int)
    id: number;

    @Column()
    @Field()
    name: string;

    @Field(() => Subject)
    @ManyToOne(() => Subject, (subject) => subject.courses)
    @JoinColumn()
    subject: Promise<Subject>

    @Field(() => Teacher)
    @ManyToOne(() => Teacher, (teacher) => teacher.courses)
    @JoinColumn()
    teacher: Promise<Teacher>
}