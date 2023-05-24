import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventsModule } from './events/events.module';
import { Event } from './events/event.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '127.0.0.1',
      port: 3306,
      username: 'root',
      password: 'secret',
      database: 'nest-events',
      entities: [Event],
      synchronize: true,
      logging: true
    }),
    EventsModule
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
