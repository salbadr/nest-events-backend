import { Resolver, Query, Args, Int, Mutation, ResolveField, Parent } from "@nestjs/graphql";
import { Teacher } from "./teacher.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { TeacherAddInput } from "./teacher-add.input";
import { Logger } from "@nestjs/common";
import { TeacherEditInput } from "./teacher-edit.input";
import { EntityWithId } from "./school.types";
import { Subject } from "./subject.entity";
import { Course } from "./course.entity";

@Resolver(() => Teacher)
export class SubjectResolver {
    private readonly logger = new Logger(SubjectResolver.name);
    constructor(
    ) { }

    @ResolveField('teacher', () => Teacher)
    public async teacher(
        @Parent() subject: Subject
    ) {
        this.logger.debug("Resolve field teacher was called");
        return subject.teacher;
    }

    @ResolveField('courses', () => [Course])
    public async courses(
        @Parent() subject: Subject
    ) {
        this.logger.debug("Resolve field courses was called");
        return subject.courses
    }
}