import { Controller, Get, Post } from '@nestjs/common';

@Controller('entities')
export class EntitiesController {
    @Get()
    findAll(): string {
        return 'Testing';
    }

    @Post()
    create(): string {
        return 'created';
    }
}
