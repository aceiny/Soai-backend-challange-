import { Body, Controller, Get, Logger, Post, Req, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { authDto } from './auth.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from './get-user.decorator';
import { Roles } from './roles.decorator';
import { RolesGuard } from './role.guard';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService : AuthService){}

    @Get()
    @UseGuards(AuthGuard())
    CheckGuards(@Req() req){
        Logger.log(req.user)
        return 'guards'
    }
    
    @Post('/signup')
    @UseGuards(AuthGuard())
    @UseGuards(RolesGuard)
    @Roles('ADMIN')
    @UsePipes(ValidationPipe)
    signUp(@Body() authDto : authDto){
        return this.authService.Signup(authDto)
    }

    @Post('/login')
    @UsePipes(ValidationPipe)
    login(@Body() authDto : authDto){
        return this.authService.Login(authDto)
    }
}
