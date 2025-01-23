import { Body, Controller, Delete, Get, HttpStatus, Inject, Param, ParseIntPipe, Patch, Post, Put } from "@nestjs/common";
import { UnitsService } from "./units.service";
import { CreateUnitDto, UpdateUnitDto } from "./units.validation";
import { HttpResponseProvider } from "src/core/core.module";

@Controller('units')
export class UnitsController {
    constructor(private unitsService: UnitsService,
        private readonly httpResponse: HttpResponseProvider,
    ) { }

    @Get()
    async findAll() {
        return this.httpResponse.success(await this.unitsService.getUnits());
    }

    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id: number) {
        const unit = await this.unitsService.getUnit(id);
        if (!unit) {
            return this.httpResponse.notFound('Unit Not Found');
        }
        return this.httpResponse.success(unit, 'Unit Found');
    }

    @Post()
    async saveUnit(@Body() createUnitDto: CreateUnitDto) {
        const unit = await this.unitsService.saveUnit(createUnitDto.name, createUnitDto.status);
        return this.httpResponse.success(unit, 'Unit created');
    }

    @Put(':id')
    async updateUnit(@Param('id', ParseIntPipe) id: number, @Body() updateUnitDto: UpdateUnitDto) {
        const isExistUnit = await this.unitsService.getUnit(id);
        if (!isExistUnit) {
            return this.httpResponse.notFound('Unit Not Found');
        }
        const unit = await this.unitsService.updateUnit(id, updateUnitDto.name, updateUnitDto.status);
        return this.httpResponse.success(unit, 'Unit Updated');
    }

    @Delete(':id')
    async deleteUnit(@Param('id', ParseIntPipe) id: number) {
        const isExistUnit = await this.unitsService.getUnit(id);
        if (!isExistUnit) {
            return this.httpResponse.notFound('Unit Not Found');
        }
        return this.httpResponse.success(await this.unitsService.deleteUnitById(id), 'Unit Deleted');
    }
}