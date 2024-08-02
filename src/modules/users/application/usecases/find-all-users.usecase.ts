import { Inject } from '@nestjs/common';
import { IUserRepository } from '../../domain/interfaces/user-repository.interface';
import { UserOutputDto } from '../../presentation/dtos/user-output.dto';

export class FindAllUsersUseCase {
    constructor(
        @Inject('IUserRepository')
        private readonly userRepository: IUserRepository,
    ) {}
    async execute(): Promise<UserOutputDto[]> {
        const users = await this.userRepository.findAll();

        const usersMaped = users.map((user): UserOutputDto => {
            return {
                id: user.id,
                email: user.email,
                name: user.name,
                birthDate: user.birthDate,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt,
            };
        });

        return usersMaped;
    }
}
