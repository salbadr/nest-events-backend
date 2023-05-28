import { Module } from "@nestjs/common";
import { TeacherResolver } from "./teacher.resolver";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Teacher } from "./teacher.entity";
import { SubjectResolver } from "./subject.resolver";
import { CourseResolver } from "./course.resolver";

@Module({
    imports: [TypeOrmModule.forFeature([Teacher])],
    providers: [TeacherResolver, SubjectResolver, CourseResolver]
})
export class SchoolModule {
}