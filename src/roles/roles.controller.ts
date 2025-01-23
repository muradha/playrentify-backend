import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from "@nestjs/common";
import { RolesService } from "./roles.service";
import { HttpResponseProvider } from "../common/http-response.provider";

@Controller('roles')
export class RolesController {
    constructor(private readonly rolesService: RolesService, private readonly httpResponse: HttpResponseProvider) { }

    @Post()
    async create(@Body() role: { name: string }) {
        return this.httpResponse.success(await this.rolesService.createRole(role.name), 'Role Created');
    }

    @Get()
    async list() {
        return this.httpResponse.success(await this.rolesService.getRoles(), 'Roles List');
    }

    @Get(':id')
    async detail(@Param('id', ParseIntPipe) id: number) {
        return this.httpResponse.success(await this.rolesService.getRoleById(id), 'Role Found');
    }

    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id: number) {
        return this.httpResponse.success(await this.rolesService.deleteRoleById(id), 'Role Deleted');
    }

    @Put(':id')
    async update(@Param('id', ParseIntPipe) id: number, @Body() role: { name: string }) {
        return this.httpResponse.success(await this.rolesService.updateRoleById(id, role.name), 'Role Updated');
    }
}