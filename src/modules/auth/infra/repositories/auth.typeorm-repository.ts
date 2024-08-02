import { InjectRepository } from '@nestjs/typeorm';
import { defaultInternalServerError } from 'src/shared/utils/default-internal-server-error';
import { Repository } from 'typeorm';
import { Auth } from '../../domain/entities/auth.entity';
import { IAuthRepository } from '../../domain/interfaces/auth-repository.interface';
import { AuthSchema } from '../schemas/auth.schema';

export class AuthTypeOrmRepository implements IAuthRepository {
    constructor(
        @InjectRepository(AuthSchema)
        private readonly authRepository: Repository<AuthSchema>,
    ) {}

    async insert(auth: Partial<Auth>): Promise<Auth> {
        const user = this.authRepository.create(auth);
        try {
            return await this.authRepository.save(user);
        } catch (error) {
            defaultInternalServerError();
        }
    }

    async findByEmail(email: string): Promise<Auth> {
        try {
            return await this.authRepository.findOneBy({ email: email });
        } catch (error) {
            defaultInternalServerError();
        }
    }

    async update(id: string, auth: Partial<Auth>): Promise<void> {
        try {
            await this.authRepository.update(id, auth);
        } catch (error) {
            defaultInternalServerError();
        }
    }

    async findAll(): Promise<Auth[]> {
        try {
            return await this.authRepository.find();
        } catch (error) {
            defaultInternalServerError();
        }
    }
}
