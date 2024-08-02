import { Injectable } from '@nestjs/common';
import { IUserService } from '../../domain/interfaces/user-service.interface';
import { CreateUserDto } from '../../presentation/dtos/create-user.dto';
import { UserOutputDto } from '../../presentation/dtos/user-output.dto';
import { CreateUserUseCase } from '../usecases/create-user.usecase';
import { FindUserByEmailUseCase } from '../usecases/find-user-by-email.usecase';
import { FindAllUsersUseCase } from './../usecases/find-all-users.usecase';
import { FindUserByIdUseCase } from './../usecases/find-user-by-id.usecase';

@Injectable()
export class UserService implements IUserService {
    constructor(
        private readonly createUserUseCase: CreateUserUseCase,
        private readonly findUserByIdUseCase: FindUserByIdUseCase,
        private readonly findAllUsersUseCase: FindAllUsersUseCase,
        private readonly findUserByEmailUseCase: FindUserByEmailUseCase,
    ) {}

    async create(request: CreateUserDto): Promise<UserOutputDto> {
        return await this.createUserUseCase.execute(request);
    }

    async findOneById(id: string): Promise<UserOutputDto> {
        return await this.findUserByIdUseCase.execute(id);
    }

    async findAll(): Promise<UserOutputDto[]> {
        return await this.findAllUsersUseCase.execute();
    }

    async findByEmail(email: string): Promise<UserOutputDto> {
        return await this.findUserByEmailUseCase.execute(email);
    }
}
