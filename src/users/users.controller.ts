import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
    /*
    GET /users
    GET /users/:id
    POST /users
    PUT /users/:id
    PATCH /users/:id
    DELETE /users/:id
    */

    constructor(private readonly userService: UsersService) {}


    @Get() //GET /users
    findAll(@Query('role') role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
        return this.userService.findAll(role);
    }

    @Get(':id') //GET /users/:id
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.userService.findOne(id);
    }

    @Post() //POST /users
    create(@Body(ValidationPipe) user: CreateUserDto) {
        return this.userService.create(user);
    }

    @Patch(':id') // PATCH /users/:id
    update(@Param('id', ParseIntPipe) id: number, @Body(ValidationPipe) user: UpdateUserDto) {
        return this.userService.update(id, user);
    }

    @Delete(':id') // DELETE /users/:id
    delete(@Param('id', ParseIntPipe) id: number) {
        return this.userService.delete(id);
    }

}
