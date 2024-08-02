import { Auth } from '../entities/auth.entity';

export interface IAuthRepository {
    insert(auth: Partial<Auth>): Promise<Auth>;
    findByEmail(email: string): Promise<Auth>;
    update(id: string, auth: Partial<Auth>): Promise<void>;
    findAll(): Promise<Auth[]>;
}
