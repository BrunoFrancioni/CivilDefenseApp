import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EntitiesController } from './entities.controller';
import { EntitiesService } from './entities.service';
import { EntitiesSchema } from './entities.schema';

@Module({
    imports: [MongooseModule.forFeature([{ name: 'Entities', schema: EntitiesSchema }])],
    controllers: [EntitiesController],
    providers: [EntitiesService]
})

export class EntitiesModule { }