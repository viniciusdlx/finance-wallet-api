import { Inject, Injectable } from '@nestjs/common';
import { IUserService } from 'src/modules/users/domain/interfaces/user-service.interface';
import { UserOutputDto } from 'src/modules/users/presentation/dtos/user-output.dto';
import { ErrorCodesEnum } from 'src/shared/enums/error-codes.enum';
import { ErrorMessagesEnum } from 'src/shared/enums/error-messages.enum';
import { BadRequestException } from 'src/shared/exceptions/bad-request.exception';
import { ErrorMessageCode } from 'src/shared/types/error-message-code';
import { hashPasswordBcrypt } from 'src/shared/utils/hash-password-bcrypt';
import { Auth } from '../../domain/entities/auth.entity';
import { IAuthRepository } from '../../domain/interfaces/auth-repository.interface';
import { validateRequestCreateAuth } from '../../infra/validators/validate-request-create-auth';
import { AuthOutputDto } from '../../presentation/dtos/auth-output.dto';
import { CreateAuthDto } from '../../presentation/dtos/create-auth.dto';

@Injectable()
export class CreateAuthUseCase {
    constructor(
        @Inject('IAuthRepository')
        private readonly authRepository: IAuthRepository,
        @Inject('IUserService')
        private readonly userService: IUserService,
    ) {}

    async execute(request: CreateAuthDto): Promise<AuthOutputDto> {
        const encryptPassword = await hashPasswordBcrypt(request.password);

        const user = await this.userService.findByEmail(request.email);

        await this.validate(request, user);

        const newAuth = new Auth({
            email: user.email,
            password: encryptPassword,
            userId: user.id,
        });

        const createdAuth = await this.authRepository.insert(newAuth);

        console.log('createdAuth -> ', createdAuth);

        return createdAuth;
    }

    async validateBusinessRules(
        req: CreateAuthDto,
        user: UserOutputDto,
    ): Promise<ErrorMessageCode[]> {
        const errors: ErrorMessageCode[] = [];
        const auth = await this.authRepository.findByEmail(req.email);

        console.log('errors -> ', errors);

        if (!user) {
            errors.push({
                message: ErrorMessagesEnum.EMAIL_OR_PASSWORD_IS_INVALID,
                code: ErrorCodesEnum.EMAIL_OR_PASSWORD_IS_INVALID,
            });
        }

        if (auth) {
            errors.push({
                message: ErrorMessagesEnum.EMAIL_IS_UNAVAILABLE,
                code: ErrorCodesEnum.EMAIL_IS_UNAVAILABLE,
            });
        }

        return errors;
    }

    async validate(req: CreateAuthDto, user: UserOutputDto): Promise<void> {
        const validateBusinessRules = await this.validateBusinessRules(
            req,
            user,
        );
        const validateRequest = await validateRequestCreateAuth(req);

        const allErrors = [...validateBusinessRules, ...validateRequest];

        if (allErrors.length > 0) {
            throw new BadRequestException(allErrors);
        }
    }
}
