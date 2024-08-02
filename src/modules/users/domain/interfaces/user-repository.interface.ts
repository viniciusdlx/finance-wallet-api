import { User } from '../entities/user.entity';

export interface IUserRepository {
    insert(user: Partial<User>): Promise<User>;
    findById(id: string): Promise<User>;
    findAll(): Promise<User[]>;
    findByEmail(email: string): Promise<User>;
}
