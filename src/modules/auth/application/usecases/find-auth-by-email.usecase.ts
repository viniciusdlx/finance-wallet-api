import { AuthOutputDto } from '../../presentation/dtos/auth-output.dto';

export class FindAuthByEmailUseCase {
    async execute(email: string): Promise<AuthOutputDto> {
        return;
    }
}
