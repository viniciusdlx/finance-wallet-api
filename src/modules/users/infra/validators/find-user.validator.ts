import { isEmail, isUUID } from 'class-validator';
import { ErrorCodesEnum } from 'src/shared/enums/error-codes.enum';
import { ErrorMessagesEnum } from 'src/shared/enums/error-messages.enum';
import { ErrorMessageCode } from 'src/shared/types/error-message-code';

type Req = {
    id?: string;
    email?: string;
};

export async function validateRequestFindUser(
    req: Req,
): Promise<ErrorMessageCode[]> {
    const errors: ErrorMessageCode = [];

    if (req.id && !isUUID(req.id, '4')) {
        errors.push({
            message: ErrorMessagesEnum.ID_HAS_INVALID_FORMAT,
            code: ErrorCodesEnum.ID_HAS_INVALID_FORMAT,
        });
    }

    if (req.email && !isEmail(req.email)) {
        errors.push({
            message: ErrorMessagesEnum.EMAIL_IS_INVALID,
            code: ErrorCodesEnum.EMAIL_IS_INVALID,
        });
    }

    return errors;
}
