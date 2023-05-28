import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventsModule } from './events/events.module';
import { Event } from './events/event.entity';
import { ConfigModule } from '@nestjs/config';
import { Attendee } from './events/attendee.entity';
import { AuthModule } from './auth/auth.module';
import { User } from './auth/user.entity';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Teacher } from './school/teacher.entity';
import { Subject } from './school/subject.entity';
import { SchoolModule } from './school/school.module';
import { Course } from './school/course.entity';
import { AuthService } from './auth/auth.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [Event, Attendee, User, Teacher, Subject, Course],
      synchronize: true,
      logging: true
    }),
    EventsModule,
    AuthModule,
    SchoolModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      playground: true,
    })
  ],

  controllers: [AppController],
  providers: [
    {
      provide: AppService,
      useClass: AppService
    },
    {
      provide: 'APP_NAME',
      useValue: 'Nest JS Event'
    },
    {
      provide: 'MESSAGE',
      inject: ['APP_NAME'],
      useFactory: (name: string) => `${name} called from Factory`
    }
  ],
})
export class AppModule { }
