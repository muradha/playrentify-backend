import { Body, ClassSerializerInterceptor, Controller, Delete, Get, HttpStatus, Inject, Param, ParseIntPipe, Patch, Post, Put, UseInterceptors } from "@nestjs/common";
import { UsersService } from "./users.service";
import { UpdateUserDto, CreateUserDto } from "./users.validation";
import { HttpResponseProvider } from "src/common/http-response.provider";
import { UserEntity } from "./users.entity";

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService,
        private readonly httpResponse: HttpResponseProvider,
    ) { }

    @UseInterceptors(ClassSerializerInterceptor)
    @Get()
    async findAll() {
        const users = await this.usersService.getUsers();
        return this.httpResponse.success(users.map(user => new UserEntity(user)));
    }

    @Get(':id') 
    async findOne(@Param('id', ParseIntPipe) id: number) {
        const user = await this.usersService.getUser(id);
        if (!user) {
            return this.httpResponse.notFound('User Not Found');
        }
        return this.httpResponse.success(new UserEntity(user), 'User Found');
    }

    @Post()
    async createUser(@Body() createUserDto: CreateUserDto) {
        const user = await this.usersService.saveUser(createUserDto.name, createUserDto.email, createUserDto.password);
        if (!user) {
            return this.httpResponse.notFound('User Not Found');
        }
        return this.httpResponse.success(user, 'User Created');
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