import { ErrorCodesEnum } from 'src/shared/enums/error-codes.enum';
import { ErrorMessagesEnum } from 'src/shared/enums/error-messages.enum';
import { ErrorMessageCode } from 'src/shared/types/error-message-code';
import { TransferAmountDto } from '../../presentation/dtos/transfer-amount.dto';

export async function validateRequestCreateTransfer(
    req: TransferAmountDto,
): Promise<ErrorMessageCode[]> {
    const errors: ErrorMessageCode = [];

    if (!req.amount && req.amount !== 0) {
        console.log('req.amount -> ', req.amount);
        errors.push({
            message: ErrorMessagesEnum.AMOUNT_IS_EMPTY,
            code: ErrorCodesEnum.AMOUNT_IS_EMPTY,
        });
    }

    return errors;
}
