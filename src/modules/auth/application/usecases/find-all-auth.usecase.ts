import { Inject } from '@nestjs/common';
import { IAuthRepository } from '../../domain/interfaces/auth-repository.interface';
import { AuthOutputDto } from '../../presentation/dtos/auth-output.dto';

export class FindAllAuthUseCase {
    constructor(
        @Inject('IAuthRepository')
        private readonly authRepository: IAuthRepository,
    ) {}

    async execute(): Promise<AuthOutputDto[]> {
        const auths = await this.authRepository.findAll();

        return auths;
    }
}
