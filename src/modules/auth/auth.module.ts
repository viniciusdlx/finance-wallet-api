import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { jwtConstants } from 'src/config/env';
import { UserModule } from '../users/user.module';
import { AuthService } from './application/services/auth.service';
import { CreateAuthUseCase } from './application/usecases/create-auth.usecase';
import { FindAllAuthUseCase } from './application/usecases/find-all-auth.usecase';
import { FindAuthByEmailUseCase } from './application/usecases/find-auth-by-email.usecase';
import { LoginUserUseCase } from './application/usecases/login-user.usecase';
import { UpdateAuthUseCase } from './application/usecases/update-auth.usecase';
import { AuthTypeOrmRepository } from './infra/repositories/auth.typeorm-repository';
import { AuthSchema } from './infra/schemas/auth.schema';
import { JwtAuthStrategy } from './infra/services/jwt-strategy.service';
import { AuthController } from './presentation/controllers/auth.controller';

export const IAuthRepository = {
    provide: 'IAuthRepository',
    useClass: AuthTypeOrmRepository,
};

export const IAuthService = {
    provide: 'IAuthService',
    useClass: AuthService,
};

@Module({
    imports: [
        TypeOrmModule.forFeature([AuthSchema]),
        UserModule,
        PassportModule,
        JwtModule.register({
            secret: jwtConstants.secret,
            signOptions: { expiresIn: jwtConstants.expiresIn },
        }),
    ],
    controllers: [AuthController],
    providers: [
        AuthService,
        JwtAuthStrategy,
        IAuthRepository,
        AuthTypeOrmRepository,
        CreateAuthUseCase,
        FindAuthByEmailUseCase,
        UpdateAuthUseCase,
        LoginUserUseCase,
        FindAllAuthUseCase,
    ],
})
export class AuthModule {}
