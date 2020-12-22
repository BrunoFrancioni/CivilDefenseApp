import { Controller, Get, Res, HttpStatus } from '@nestjs/common';
import { EntitiesService } from './entities.service';

@Controller('entities')
export class EntitiesController {
    constructor(private entitiesService: EntitiesService) { }

    @Get('/')
    async findAll(@Res() res) {
        try {
            const result = await this.entitiesService.findAll();

            return res.status(HttpStatus.OK).json({
                result
            });
        } catch (e) {
            console.log(e);
            return res.status(HttpStatus.BAD_GATEWAY);
        }
    }

    /*@Get('/:id/:h')
    findAll(@Param('id') id, @Param('h') h): string {
        return `The id is ${id} and the h is ${h}`;
    }

    @Post()
    create(): string {
        return 'created';
    }*/
}
