import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Teacher } from "./teacher.entity";
import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { Course } from "./course.entity";

@Entity('subject')
@ObjectType()
export class Subject {

    @PrimaryGeneratedColumn()
    @Field()
    id: number;

    @Column()
    @Field()
    name: string;

    @ManyToOne(() => Teacher, (teacher) => teacher.subjects)
    @JoinColumn()
    @Field(() => Teacher)
    teacher: Promise<Teacher>;


    @OneToMany(() => Course, (course) => course.subject)
    @JoinColumn()
    @Field(() => [Course])
    courses: Promise<Course[]>;
}