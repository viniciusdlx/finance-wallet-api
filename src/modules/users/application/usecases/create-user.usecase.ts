import { Inject } from '@nestjs/common';
import { ErrorCodesEnum } from 'src/shared/enums/error-codes.enum';
import { ErrorMessagesEnum } from 'src/shared/enums/error-messages.enum';
import { BadRequestException } from 'src/shared/exceptions/bad-request.exception';
import { ErrorMessageCode } from 'src/shared/types/error-message-code';
import { User } from '../../domain/entities/user.entity';
import { IUserRepository } from '../../domain/interfaces/user-repository.interface';
import { validateRequestCreateUser } from '../../infra/validators/create-user.validator';
import { CreateUserDto } from '../../presentation/dtos/create-user.dto';
import { UserOutputDto } from '../../presentation/dtos/user-output.dto';

export class CreateUserUseCase {
    constructor(
        @Inject('IUserRepository')
        private readonly userRepository: IUserRepository,
    ) {}

    async execute(request: CreateUserDto): Promise<UserOutputDto> {
        await this.validate(request);

        const newUser = new User({
            email: request.email,
            name: request.name,
            birthDate: request.birthDate,
        });

        const createdUser = await this.userRepository.insert(newUser);

        return {
            id: createdUser.id,
            email: createdUser.email,
            name: createdUser.name,
            birthDate: createdUser.birthDate,
            createdAt: createdUser.createdAt,
            updatedAt: createdUser.updatedAt,
        };
    }

    private async validateBusinessRules(
        req: CreateUserDto,
    ): Promise<ErrorMessageCode[]> {
        const errors: ErrorMessageCode = [];

        // busca o user pelo email
        const emailUnavailable = await this.userRepository.findByEmail(
            req.email,
        );

        // se o email estiver indisponivel, adiciona a lista de erros
        if (emailUnavailable) {
            errors.push({
                message: ErrorMessagesEnum.EMAIL_IS_UNAVAILABLE,
                code: ErrorCodesEnum.EMAIL_IS_UNAVAILABLE,
            });
        }

        return errors;
    }

    private async validate(req: CreateUserDto): Promise<void> {
        const validateRequest = await validateRequestCreateUser(req);
        const validateBusinessRules = await this.validateBusinessRules(req);

        const allErrors = [...validateRequest, ...validateBusinessRules];

        if (allErrors.length > 0) {
            throw new BadRequestException(allErrors);
        }
    }
}
