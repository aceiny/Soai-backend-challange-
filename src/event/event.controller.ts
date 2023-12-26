import { Body, Controller, Delete, ForbiddenException, Get, Param, Patch, Post, Query, UploadedFile, UseGuards, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { EventService } from './event.service';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/role.guard';
import { Roles } from '../auth/roles.decorator';
import { eventDto } from './event.dto';
import { eventStatus } from './event.types';
import { FileInterceptor } from '@nestjs/platform-express';
import {diskStorage} from 'multer'
@Controller('event')
export class EventController {
    constructor(
        private eventService : EventService
    ) {}
    @Get()
    getAllEvents (@Query() filters) {
        return this.eventService.getEvents(filters);
    }

    @Get('/:id')
    getEventById (@Param('id') id : string) {
        return this.eventService.getEventById(id);
    }

    @Post()
    @UseInterceptors(FileInterceptor('poster',  {
        storage: diskStorage({
          destination: './uploads',
          filename: (_, file, callback) => {
            callback(null, `${Date.now()}-${file.originalname}`);
          },
        }),
      }))
    @UseGuards(AuthGuard())
    @UseGuards(RolesGuard)
    @UsePipes(ValidationPipe)
    @Roles('ADMIN')
    createEvent (@Body() event : eventDto , @UploadedFile() image : any) {
        let poster = ""
        if(image) {
            poster  = '/uploads/' + image.filename
        }
        return this.eventService.createEvent(event , poster);
    }

    @Patch('/:id')
    @UseGuards(AuthGuard())
    @UseGuards(RolesGuard)
    @Roles('ADMIN')
    updateEvent (@Param('id') id:string ,@Body() event : any) {
        if(event.status && [eventStatus.OPEN, eventStatus.CLOSED].indexOf(event.status) === -1) throw new   ForbiddenException('Invalid status , should be OPEN or CLOSED')
        return this.eventService.updateEvent(id , event);
    }

    @Delete('/:id')
    @UseGuards(AuthGuard())
    @UseGuards(RolesGuard)
    @Roles('ADMIN')
    deleteEvent (@Param('id') id : string) {
        return this.eventService.deleteEvent(id);
    }

}
