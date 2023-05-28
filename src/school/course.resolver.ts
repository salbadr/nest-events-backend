import { Resolver, Query, Args, Int, Mutation, ResolveField, Parent } from "@nestjs/graphql";
import { Teacher } from "./teacher.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { TeacherAddInput } from "./teacher-add.input";
import { Logger } from "@nestjs/common";
import { TeacherEditInput } from "./teacher-edit.input";
import { EntityWithId } from "./school.types";
import { Course } from "./course.entity";

@Resolver(() => Course)
export class CourseResolver {
    private readonly logger = new Logger(CourseResolver.name);
    constructor(

    ) { }


    @ResolveField('teacher')
    public async teacher(
        @Parent() course: Course
    ) {
        this.logger.debug("Resolve field teacher was called");
        return course.teacher;
    }


    @ResolveField('subject')
    public async subject(
        @Parent() course: Course
    ) {
        this.logger.debug("Resolve field subject was called");
        return course.subject;
    }
}