import { IsIn, IsNotEmpty, IsString, isString } from "class-validator";
import { eventStatus } from "./event.types";

export class eventDto {
    @IsString()
    @IsNotEmpty()
    title : string;

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsString()
    @IsNotEmpty()
    date: string;

    @IsString()
    @IsNotEmpty()
    location: string;


}