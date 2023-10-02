import { Body, Controller, Get, Post } from '@nestjs/common';
import { createUserDto } from './dtos/createUser.dto';
import { UserService } from './user.service';
import { userEntity } from './entities/user.entity';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post()
    async createUsers(@Body() createUsers: createUserDto): Promise<userEntity> {
        return this.userService.createUser(createUsers);
    }

    @Get()
    async getAllUser(): Promise<userEntity[]> {
        return this.userService.getAllUser();
    }
}
