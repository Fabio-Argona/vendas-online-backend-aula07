import { Injectable } from '@nestjs/common';
import { createUserDto } from './dtos/createUser.dto';
import { userEntity} from './entities/user.entity';
import { hash } from 'bcrypt';
import { InjectRepository }  from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(userEntity)
        private readonly userRepository: Repository<userEntity>,
    ) {}

    async createUser(createUserDto: createUserDto): Promise<userEntity> {
        const saltOrRounds = 10;

        const passwordhashed = await hash(createUserDto.password, saltOrRounds);

        return this.userRepository.save({
            ...createUserDto,
            typeUser: 1,
            password: passwordhashed
        });
    }

    async getAllUser(): Promise<userEntity[]> {
        return this.userRepository.find();
    }
}

