import { Body, Controller, Delete, Get, HttpStatus, Inject, Param, ParseIntPipe, Patch, Post, Put } from "@nestjs/common";
import { UsersService } from "./users.service";
import { UpdateUserDto, CreateUserDto } from "./users.validation";

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService,
        @Inject('HttpResponse') private readonly httpResponse: any,
    ) { }

    @Get()
    async findAll() {
        const users = await this.usersService.getUsers();
        return this.httpResponse.success(users);
    }

    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id: number) {
        const user = await this.usersService.getUser(id);
        if (!user) {
            return this.httpResponse.notFound('User Not Found');
        }
        return this.httpResponse.success(user, 'User Found');
    }

    @Post()
    async createUser(@Body() createUserDto: CreateUserDto) {
        const user = await this.usersService.saveUser(createUserDto.name, createUserDto.email, createUserDto.password);
        if (!user) {
            return this.httpResponse.notFound('User Not Found');
        }
        return this.httpResponse.succes(user, 'User Created');
    }

    @Put(':id')
    async updateUser(@Param('id', ParseIntPipe) id: number, @Body() updateUserDto: UpdateUserDto) {
        const user = await this.usersService.updateUser(id, updateUserDto.name, updateUserDto.email, updateUserDto.password);
        if (!user) {
            return this.httpResponse.notFound('User Not Found');
        }
        return this.httpResponse.success(user, 'User Updated');
    }

    @Delete(':id')
    async deleteUser(@Param('id', ParseIntPipe) id: number) {
        const user = await this.usersService.getUser(id);
        if (!user) {
            return this.httpResponse.notFound('User Not Found');
        }
        return this.httpResponse.success(await this.usersService.deleteUserById(id), 'User Deleted');
    }
}