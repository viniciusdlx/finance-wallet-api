import { Inject } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import bcrypt from 'bcrypt';
import { IUserService } from 'src/modules/users/domain/interfaces/user-service.interface';
import { ErrorCodesEnum } from 'src/shared/enums/error-codes.enum';
import { ErrorMessagesEnum } from 'src/shared/enums/error-messages.enum';
import { BadRequestException } from 'src/shared/exceptions/bad-request.exception';
import { ErrorMessageCode } from 'src/shared/types/error-message-code';
import { Auth } from '../../domain/entities/auth.entity';
import { IAuthRepository } from '../../domain/interfaces/auth-repository.interface';
import { validateRequestLogin } from '../../infra/validators/validate-request-login';
import { AccessTokenDto } from '../../presentation/dtos/access-token.dto';
import { LoginUserDto } from '../../presentation/dtos/login-user.dto';
import { UserPayloadDto } from '../../presentation/dtos/user-payload.dto';

export class LoginUserUseCase {
    constructor(
        @Inject('IAuthRepository')
        private readonly authRepository: IAuthRepository,
        @Inject('IUserService')
        private readonly userService: IUserService,
        private readonly jwtService: JwtService,
    ) {}

    async execute(request: LoginUserDto): Promise<AccessTokenDto> {
        const authUser = await this.authRepository.findByEmail(request.email);
        const user = await this.userService.findByEmail(request.email);

        await this.validate(request, authUser);

        const payload: UserPayloadDto = {
            sub: user.id,
            name: user.name,
            email: user.email,
        };

        const accessToken = this.jwtService.sign(payload);

        return { accessToken };
    }

    private async validateBusinessRules(
        req: LoginUserDto,
        auth: Auth,
    ): Promise<ErrorMessageCode[]> {
        const errors: ErrorMessageCode[] = [];

        if (!auth) {
            errors.push({
                message: ErrorMessagesEnum.EMAIL_OR_PASSWORD_IS_INVALID,
                code: ErrorCodesEnum.EMAIL_OR_PASSWORD_IS_INVALID,
            });
        }

        if (auth) {
            const passwordMatches = await bcrypt.compare(
                req.password,
                auth.password,
            );

            if (!passwordMatches) {
                errors.push({
                    message: ErrorMessagesEnum.EMAIL_OR_PASSWORD_IS_INVALID,
                    code: ErrorCodesEnum.EMAIL_OR_PASSWORD_IS_INVALID,
                });
            }
        }

        return errors;
    }

    private async validate(request: LoginUserDto, auth: Auth): Promise<void> {
        const validateRequest = await validateRequestLogin(request);
        const validateBusinessRules = await this.validateBusinessRules(
            request,
            auth,
        );

        const allErrors = [...validateRequest, ...validateBusinessRules];

        if (allErrors.length > 0) {
            throw new BadRequestException(allErrors);
        }
    }
}
