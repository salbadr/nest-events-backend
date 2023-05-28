import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Subject } from "./subject.entity";
import { Field, ObjectType } from "@nestjs/graphql";
import { Gender } from "./school.types";
import { Course } from "./course.entity";

@Entity('teacher')
@ObjectType()
export class Teacher {
    constructor(partial?: Partial<Teacher>) {
        Object.assign(this, partial);
    }

    @PrimaryGeneratedColumn()
    @Field({ nullable: true })
    id: number;

    @Column()
    @Field()
    name: string;

    @Column({ type: 'enum', enum: Gender, default: Gender.Other })
    @Field(() => Gender)
    gender: Gender

    @OneToMany(() => Subject, (subject) => subject.teacher)
    @JoinColumn()
    @Field(() => [Subject])
    subjects: Promise<Subject[]>;


    @OneToMany(() => Course, (course) => course.teacher)
    @JoinColumn()
    @Field(() => [Course])
    courses: Promise<Course[]>;
}