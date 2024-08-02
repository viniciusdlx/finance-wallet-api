import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './application/services/user.service';
import { CreateUserUseCase } from './application/usecases/create-user.usecase';
import { FindAllUsersUseCase } from './application/usecases/find-all-users.usecase';
import { FindUserByEmailUseCase } from './application/usecases/find-user-by-email.usecase';
import { FindUserByIdUseCase } from './application/usecases/find-user-by-id.usecase';
import { UserTypeOrmRepository } from './infra/repositories/user.typeorm-repository';
import { UserSchema } from './infra/schemas/user.schema';
import { UserController } from './presentation/controllers/user.controller';

export const IUserRepository = {
    provide: 'IUserRepository',
    useClass: UserTypeOrmRepository,
};

export const IUserService = {
    provide: 'IUserService',
    useClass: UserService,
};

@Module({
    imports: [TypeOrmModule.forFeature([UserSchema])],
    controllers: [UserController],
    providers: [
        UserService,
        IUserService,
        IUserRepository,
        UserTypeOrmRepository,
        CreateUserUseCase,
        FindUserByIdUseCase,
        FindAllUsersUseCase,
        FindUserByEmailUseCase,
    ],
    exports: [IUserService],
})
export class UserModule {}
