import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { defaultInternalServerError } from 'src/shared/utils/default-internal-server-error';
import { DataSource, Repository } from 'typeorm';
import { User } from '../../domain/entities/user.entity';
import { IUserRepository } from '../../domain/interfaces/user-repository.interface';
import { UserSchema } from '../schemas/user.schema';

@Injectable()
export class UserTypeOrmRepository implements IUserRepository {
    constructor(
        @InjectRepository(UserSchema)
        private readonly userRepository: Repository<UserSchema>,
        private readonly connect: DataSource,
    ) {}

    async findAll(): Promise<User[]> {
        try {
            return await this.userRepository.find();
        } catch (error) {
            defaultInternalServerError();
        }
    }

    async findById(id: string): Promise<User> {
        try {
            console.log('id -> ', id);
            return await this.userRepository.findOneBy({ id: id });
        } catch (error) {
            defaultInternalServerError();
        }
    }

    async insert(user: Partial<User>): Promise<User> {
        try {
            const queryRunner = this.connect.createQueryRunner();

            await queryRunner.startTransaction();

            try {
                const newUser = await queryRunner.manager
                    .getRepository(UserSchema)
                    .save(user);
                await queryRunner.commitTransaction();

                return newUser;
            } catch (error) {
                await queryRunner.rollbackTransaction();
            } finally {
                await queryRunner.release();
            }
        } catch (error) {
            defaultInternalServerError();
        }
    }

    async findByEmail(email: string): Promise<User> {
        try {
            return await this.userRepository.findOneBy({ email: email });
        } catch (error) {
            defaultInternalServerError();
        }
    }
}
