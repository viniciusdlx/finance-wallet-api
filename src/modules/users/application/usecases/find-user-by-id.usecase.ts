import { Inject } from '@nestjs/common';
import { ErrorCodesEnum } from 'src/shared/enums/error-codes.enum';
import { ErrorMessagesEnum } from 'src/shared/enums/error-messages.enum';
import { BadRequestException } from 'src/shared/exceptions/bad-request.exception';
import { IUserRepository } from '../../domain/interfaces/user-repository.interface';
import { validateRequestFindUser } from '../../infra/validators/find-user.validator';
import { UserOutputDto } from '../../presentation/dtos/user-output.dto';
import { NotFoundException } from './../../../../shared/exceptions/not-found.exception';

export class FindUserByIdUseCase {
    constructor(
        @Inject('IUserRepository')
        private readonly userRepository: IUserRepository,
    ) {}
    async execute(id: string): Promise<UserOutputDto> {
        await this.validate(id);

        const user = await this.userRepository.findById(id);

        if (!user) {
            throw new NotFoundException({
                message: ErrorMessagesEnum.USER_NOT_FOUND,
                code: ErrorCodesEnum.USER_NOT_FOUND,
            });
        }

        return {
            id: user.id,
            email: user.email,
            name: user.name,
            birthDate: user.birthDate,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
        };
    }

    private async validate(id: string): Promise<void> {
        const validateRequest = await validateRequestFindUser({ id: id });

        const allErrors = [...validateRequest];

        if (allErrors.length > 0) {
            throw new BadRequestException(allErrors);
        }
    }
}
