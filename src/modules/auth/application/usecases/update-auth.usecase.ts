import { UpdateAuthDto } from '../../presentation/dtos/update-auth.dto';

export class UpdateAuthUseCase {
    async execute(id: string, request: UpdateAuthDto): Promise<void> {
        return;
    }
}
