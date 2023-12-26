import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Event } from './event.schema';
import { Model } from 'mongoose';
import { eventDto } from './event.dto';

@Injectable()
export class EventService {
    constructor (
        @InjectModel(Event.name)
        private eventModel : Model<Event>
    )   {}  
    getEvents (filters) : Promise<Event[]> {
        let Qobj = {}
        if(filters.title){
            Qobj['title'] = { $regex: filters.title , $options: 'i'}
        }
        if(filters.description){
            Qobj['description'] = { $regex: filters.description , $options: 'i'}
        }
        if(filters.date){
            Qobj['date'] = { $regex: filters.date , $options: 'i'}
        }
        if(filters.location){
            Qobj['location'] = { $regex: filters.location , $options: 'i'}
        }
        if(filters.status){
            Qobj['status'] = filters.status
        }
        return this.eventModel.find(Qobj);
    }
    async getEventById (id : string) : Promise<Event> {
        const event = await this.eventModel.findById(id)
        if(!event){
            throw new NotFoundException('Event not found');
        }
        return event ;
    }
    createEvent (event , poster) : Promise<Event> {

        const { title , description , date , location} = event

        return this.eventModel.create({
            title,
            description,
            date,
            location,
            poster
        });
    }
    async updateEvent (id , event : eventDto) : Promise<Event> {
        const eventO = await this.eventModel.findByIdAndUpdate(id , event , {new : true})
        if(!eventO){
            throw new NotFoundException('Event not found');
        }
        return eventO;
    }
    async deleteEvent (id : string) {
        const event = await this.eventModel.findByIdAndDelete(id)
        if(!event){
            throw new NotFoundException('Event not found');
        }
        return event ;
    }
}
