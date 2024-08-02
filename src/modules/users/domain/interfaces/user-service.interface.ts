import { CreateUserDto } from '../../presentation/dtos/create-user.dto';
import { UserOutputDto } from '../../presentation/dtos/user-output.dto';

export interface IUserService {
    create(request: CreateUserDto): Promise<UserOutputDto>;
    findOneById(id: string): Promise<UserOutputDto>;
    findAll(): Promise<UserOutputDto[]>;
    findByEmail(email: string): Promise<UserOutputDto>;
}
