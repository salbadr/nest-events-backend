import { Body, Controller, Delete, Get, HttpCode, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { CreateEventDTO } from './create-event.dto';
import { Event } from './event.entity';
import { UpdateEventDTO } from './update-event.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Controller('/events')
export class EventsController {

  constructor(
    @InjectRepository(Event)
    private readonly repositoryEvent: Repository<Event>
  ) { }

  @Get()
  findAll() {
    return this.repositoryEvent.find();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: string): Promise<Event> {
    return this.repositoryEvent.findOneBy({ id: parseInt(id) })
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
