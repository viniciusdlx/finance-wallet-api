import { isDate, isEmail, isNotEmpty } from 'class-validator';
import dayjs from 'dayjs';
import { ErrorCodesEnum } from 'src/shared/enums/error-codes.enum';
import { ErrorMessagesEnum } from 'src/shared/enums/error-messages.enum';
import { ErrorMessageCode } from 'src/shared/types/error-message-code';
import { CreateUserDto } from '../../presentation/dtos/create-user.dto';

export async function validateRequestCreateUser(
    req: CreateUserDto,
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
    if (!isNotEmpty(req.name)) {
        errors.push({
            message: ErrorMessagesEnum.NAME_IS_EMPTY,
            code: ErrorCodesEnum.NAME_IS_EMPTY,
        });
    }

    // se data nascimento é uma data
    if (!isDate(req.birthDate)) {
        errors.push({
            message: ErrorMessagesEnum.BIRTH_DATE_IS_EMPTY,
            code: ErrorCodesEnum.BIRTH_DATE_IS_EMPTY,
        });
    }

    // se a data atual é menor que a data informada
    if (dayjs().isBefore(req.birthDate, 'date')) {
        errors.push({
            message: ErrorMessagesEnum.BIRTH_DATE_IS_INVALID,
            code: ErrorCodesEnum.BIRTH_DATE_IS_INVALID,
        });
    }

    return errors;
}
