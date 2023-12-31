import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { EventModule } from './event/event.module';
@Module({
  imports: [
     MongooseModule.forRoot(process.env.MONGO_URI) , 
     AuthModule, EventModule
    ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
