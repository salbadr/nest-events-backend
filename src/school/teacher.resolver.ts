import { Resolver, Query, Args, Int, Mutation, ResolveField, Parent } from "@nestjs/graphql";
import { Teacher } from "./teacher.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { TeacherAddInput } from "./teacher-add.input";
import { Logger, UseGuards } from "@nestjs/common";
import { TeacherEditInput } from "./teacher-edit.input";
import { EntityWithId } from "./school.types";
import { AuthGuardJwtGql } from "src/auth/auth-guard-jwt-gql";

@Resolver(() => Teacher)
export class TeacherResolver {
    private readonly logger = new Logger(TeacherResolver.name);
    constructor(
        @InjectRepository(Teacher)
        private readonly teachersRepository: Repository<Teacher>
    ) { }

    @Query(() => [Teacher])
    public async teachers(): Promise<Teacher[]> {
        return this.teachersRepository.find();
    }


    @Query(() => Teacher)
    public async teacher(
        @Args('id', { type: () => Int })
        id: number): Promise<Teacher> {

        return this.teachersRepository.findOneOrFail({
            where: { id }
        });
    }

    @Mutation(() => Teacher, { name: 'teacherAdd' })
    @UseGuards(AuthGuardJwtGql)
    public async add(
        @Args('input', { type: () => TeacherAddInput })
        input: TeacherAddInput
    ): Promise<Teacher> {
        return this.teachersRepository.save(new Teacher(input));
    }

    @Mutation(() => Teacher, { name: 'teacherEdit' })
    public async edit(
        @Args('id', { type: () => Int })
        id: number,
        @Args('input', { type: () => TeacherEditInput })
        input: TeacherEditInput
    ): Promise<Teacher> {
        const teacher = await this.teachersRepository.findOneOrFail({ where: { id } })
        return this.teachersRepository.save(new Teacher({ ...teacher, ...input }));
    }

    @Mutation(() => EntityWithId, { name: 'teacherDelete' })
    public async delete(
        @Args('id', { type: () => Int })
        id: number
    ): Promise<EntityWithId> {
        const teacher = await this.teachersRepository.findOneOrFail({ where: { id } })

        await this.teachersRepository.delete(teacher.id)
        return new EntityWithId(teacher.id);
    }



    @ResolveField('subjects')
    public async subjects(
        @Parent() teacher: Teacher
    ) {
        this.logger.debug("Resolve field subject was called");
        return teacher.subjects;
    }

    @ResolveField('courses')
    public async courses(
        @Parent() teacher: Teacher
    ) {
        this.logger.debug("Resolve field courses was called");
        return teacher.courses;
    }

}