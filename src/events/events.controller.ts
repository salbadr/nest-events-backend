import { Body, Controller, Delete, Get, HttpCode, Inject, Logger, Param, ParseIntPipe, Patch, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateEventDTO } from './create-event.dto';
import { Event } from './event.entity';
import { UpdateEventDTO } from './update-event.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Attendee } from './attendee.entity';
import { EventService } from './events.service';
import { PaginateOptions } from './paginate';

@Controller('/events')
export class EventsController {

  private readonly logger: Logger = new Logger();

  constructor(
    @InjectRepository(Event)
    private readonly repositoryEvent: Repository<Event>,

    @InjectRepository(Attendee)
    private readonly repositoryAttendee: Repository<Attendee>,

    @Inject(EventService)
    private readonly eventsService:EventService
  ) { }

  @Get('practice')
  async practice(){
    const event= await this.repositoryEvent.findOne({where : {id: 1}});

    const attendee = new Attendee();
    attendee.event = event;
    attendee.name= 'Salman';

    this.repositoryAttendee.save(attendee);
  }

  @Get()
  @UsePipes(new ValidationPipe({transform: true}))
  findAll() {
    this.logger.warn("Find all events");

    return this.eventsService.getEventsPaginated({currentPage: 1, limit: 10});
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: string): Promise<Event> {

    return this.eventsService.getEvent(parseInt(id))
  }

  @Post()
  create(@Body() request: CreateEventDTO): Promise<Event> {
    return this.repositoryEvent.save({
      ...request,
      when: new Date(request.when)
    });
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() request: UpdateEventDTO): Promise<Event> {
    const event = await this.repositoryEvent.findOneBy({ id: parseInt(id) });

    const result = await this.repositoryEvent.save({
      ...request,
      when: request.when ? new Date(request.when) : event.when
    });

    return result;
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id') id: string): Promise<void> {
    const event = await this.repositoryEvent.findOneBy({ id: parseInt(id) });

    await this.repositoryEvent.remove(event);
  }


}
