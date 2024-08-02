import { ErrorCodesEnum } from 'src/shared/enums/error-codes.enum';
import { ErrorMessagesEnum } from 'src/shared/enums/error-messages.enum';
import { ErrorMessageCode } from 'src/shared/types/error-message-code';
import { CreateWalletDto } from '../../presentation/dtos/create-wallet.dto';

export async function validateRequestCreateWallet(
    req: CreateWalletDto,
): Promise<ErrorMessageCode[]> {
    const errors: ErrorMessageCode = [];

    if (!req.name) {
        errors.push({
            message: ErrorMessagesEnum.NAME_IS_EMPTY,
            code: ErrorCodesEnum.NAME_IS_EMPTY,
        });
    }

    return errors;
}
