import { Injectable } from '@nestjs/common';
import { IAuthService } from '../../domain/interfaces/auth-service.interface';
import { AccessTokenDto } from '../../presentation/dtos/access-token.dto';
import { AuthOutputDto } from '../../presentation/dtos/auth-output.dto';
import { CreateAuthDto } from '../../presentation/dtos/create-auth.dto';
import { LoginUserDto } from '../../presentation/dtos/login-user.dto';
import { UpdateAuthDto } from '../../presentation/dtos/update-auth.dto';
import { CreateAuthUseCase } from '../usecases/create-auth.usecase';
import { FindAllAuthUseCase } from '../usecases/find-all-auth.usecase';
import { FindAuthByEmailUseCase } from '../usecases/find-auth-by-email.usecase';
import { LoginUserUseCase } from '../usecases/login-user.usecase';
import { UpdateAuthUseCase } from '../usecases/update-auth.usecase';

@Injectable()
export class AuthService implements IAuthService {
    constructor(
        private readonly createAuthUseCase: CreateAuthUseCase,
        private readonly findAuthByEmailUseCase: FindAuthByEmailUseCase,
        private readonly updateAuthUseCase: UpdateAuthUseCase,
        private readonly loginUserUseCase: LoginUserUseCase,
        private readonly findAllAuthUseCase: FindAllAuthUseCase,
    ) {}

    async create(request: CreateAuthDto): Promise<AuthOutputDto> {
        return await this.createAuthUseCase.execute(request);
    }

    async findByEmail(email: string): Promise<AuthOutputDto> {
        return await this.findAuthByEmailUseCase.execute(email);
    }

    async update(id: string, request: UpdateAuthDto): Promise<void> {
        await this.updateAuthUseCase.execute(id, request);
    }

    async login(request: LoginUserDto): Promise<AccessTokenDto> {
        return await this.loginUserUseCase.execute(request);
    }

    async findAll(): Promise<AuthOutputDto[]> {
        return await this.findAllAuthUseCase.execute();
    }
}
