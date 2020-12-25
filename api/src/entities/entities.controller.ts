import { Controller, Get, Res, HttpStatus, Post, Body, Put, Delete, Param } from '@nestjs/common';
import { EntitiesService } from './entities.service';

import CreateEntityDTO from './dto/createEntityDTO';

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
            return res.status(HttpStatus.BAD_GATEWAY);
        }
    }

    @Get('/:idEntity')
    async findById(@Param('idEntity') idEntity: string, @Res() res) {
        try {
            const result = await this.entitiesService.findById(idEntity);

            return res.status(HttpStatus.OK).json({
                result
            });
        } catch (e) {
            return res.status(HttpStatus.BAD_GATEWAY);
        }
    }

    @Post('/')
    async createEntity(@Body() body: CreateEntityDTO, @Res() res) {
        try {
            const result = await this.entitiesService.createEntity(body);

            if (result) {
                return res.status(HttpStatus.CREATED);
            } else {
                return res.status(HttpStatus.BAD_REQUEST);
            }
        } catch (e) {
            return res.status(HttpStatus.BAD_GATEWAY);
        }
    }

    @Put('/:idEntity')
    async editEntity(@Body() body: CreateEntityDTO, @Param('idEntity') idEntity: string, @Res() res) {
        try {
            const result = await this.entitiesService.updateEntity(idEntity, body);

            return res.status(HttpStatus.OK).json({
                result
            });
        } catch (e) {
            return res.status(HttpStatus.BAD_GATEWAY);
        }
    }

    @Delete('/:idEntity')
    async deleteEntity(@Param('idEntity') idEntity: string, @Res() res) {
        try {
            const result = await this.entitiesService.deleteEntity(idEntity);

            if (!result) {
                return res.status(HttpStatus.BAD_REQUEST);
            }

            return res.status(HttpStatus.OK);
        } catch (e) {
            return res.status(HttpStatus.BAD_GATEWAY);
        }
    }
}
