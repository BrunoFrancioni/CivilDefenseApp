import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { EntitiesModule } from './entities/entities.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(`mongodb+srv://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@civil-defense.r981f.mongodb.net/civil-defense?retryWrites=true&w=majority`),
    EntitiesModule
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule { }
