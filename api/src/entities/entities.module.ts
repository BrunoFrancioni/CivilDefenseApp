import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EntitiesController } from './entities.controller';
import { EntitiesService } from './entities.service';
import { EntitySchema } from './entities.schema';

@Module({
    imports: [MongooseModule.forFeature([{ name: 'Entity', schema: EntitySchema }])],
    controllers: [EntitiesController],
    providers: [EntitiesService]
})

export class EntitiesModule { }