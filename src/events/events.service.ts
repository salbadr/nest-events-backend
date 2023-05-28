import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Event } from './event.entity';
import { PaginateOptions, paginate } from "./paginate";

@Injectable()
export class EventService {

    constructor(
        @InjectRepository(Event)
        private readonly repositoryEvent: Repository<Event>
    ){}

    private getEventsBaseQuery(){
       return this.repositoryEvent.createQueryBuilder('event')
        .select()
        .orderBy('id', 'ASC');
    }

    public getEventBaseQueryWithAttendee(){
        return this.getEventsBaseQuery()
        .loadRelationCountAndMap('event.attendeeCount', 'event.attendees');
    }

    
    public async getEventsPaginated(pagination: PaginateOptions) {
        return paginate(this.getEventBaseQueryWithAttendee(), pagination)  
     }

    public async getEvent(id:number) {
       return this.getEventBaseQueryWithAttendee()
        .andWhere('id = :id', {id})
        
        .getOne();
    }
}