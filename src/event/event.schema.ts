import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { eventStatus } from "./event.types";

@Schema()
export class Event extends Document {
    @Prop()
    title : string 
    @Prop()
    description : string
    @Prop()
    date : Date
    @Prop()
    location : string
    @Prop({default : eventStatus.OPEN})
    status : eventStatus
    @Prop()
    poster : string
}
export const EventSchema = SchemaFactory.createForClass(Event);