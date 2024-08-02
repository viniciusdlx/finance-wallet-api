import { isEmail, isNotEmpty } from 'class-validator';
import { ErrorCodesEnum } from 'src/shared/enums/error-codes.enum';
import { ErrorMessagesEnum } from 'src/shared/enums/error-messages.enum';
import { ErrorMessageCode } from 'src/shared/types/error-message-code';
import { CreateAuthDto } from '../../presentation/dtos/create-auth.dto';

export async function validateRequestCreateAuth(
    req: CreateAuthDto,
): Promise<ErrorMessageCode[]> {
    const errors: ErrorMessageCode = [];

    // se é um email válido
    if (!isEmail(req.email)) {
        errors.push({
            message: ErrorMessagesEnum.EMAIL_IS_INVALID,
            code: ErrorCodesEnum.EMAIL_IS_INVALID,
        });
    }

    // se nome está vazio
    if (!isNotEmpty(req.password)) {
        errors.push({
            message: ErrorMessagesEnum.PASSWORD_IS_EMPTY,
            code: ErrorCodesEnum.PASSWORD_IS_EMPTY,
        });
    }

    return errors;
}
