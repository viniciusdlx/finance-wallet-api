import { Inject } from '@nestjs/common';
import { BadRequestException } from 'src/shared/exceptions/bad-request.exception';
import { IUserRepository } from '../../domain/interfaces/user-repository.interface';
import { validateRequestFindUser } from '../../infra/validators/find-user.validator';
import { UserOutputDto } from '../../presentation/dtos/user-output.dto';

export class FindUserByEmailUseCase {
    constructor(
        @Inject('IUserRepository')
        private readonly userRepository: IUserRepository,
    ) {}

    async execute(email: string): Promise<UserOutputDto> {
        await this.validate(email);

        const user = await this.userRepository.findByEmail(email);

        // if (!user) {
        //     throw new NotFoundException({
        //         message: ErrorMessagesEnum.USER_NOT_FOUND,
        //         code: ErrorCodesEnum.USER_NOT_FOUND,
        //     });
        // }

        if (user) {
            return {
                id: user.id,
                email: user.email,
                name: user.name,
                birthDate: user.birthDate,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt,
            };
        }
    }

    private async validate(email: string): Promise<void> {
        const validateRequest = await validateRequestFindUser({ email: email });

        const allErrors = [...validateRequest];

        if (allErrors.length > 0) {
            throw new BadRequestException(allErrors);
        }
    }
}
