import { AccessTokenDto } from '../../presentation/dtos/access-token.dto';
import { AuthOutputDto } from '../../presentation/dtos/auth-output.dto';
import { CreateAuthDto } from '../../presentation/dtos/create-auth.dto';
import { LoginUserDto } from '../../presentation/dtos/login-user.dto';
import { UpdateAuthDto } from '../../presentation/dtos/update-auth.dto';

export interface IAuthService {
    create(request: CreateAuthDto): Promise<AuthOutputDto>;
    findByEmail(email: string): Promise<AuthOutputDto>;
    update(id: string, request: UpdateAuthDto): Promise<void>;
    login(request: LoginUserDto): Promise<AccessTokenDto>;
    findAll(): Promise<AuthOutputDto[]>;
}
