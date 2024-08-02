import { ErrorCodesEnum } from '../enums/error-codes.enum';
import { ErrorMessagesEnum } from '../enums/error-messages.enum';
import { BadRequestException } from '../exceptions/bad-request.exception';

export function formatBalance(
    balance: number | string,
    format: 'withCurrency' | 'valueOnly',
): string | number {
    if (typeof balance === 'number') {
        const formattedValue = (balance / 100).toLocaleString('pt-BR', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        });

        switch (format) {
            case 'withCurrency':
                return `R$ ${formattedValue}`;
            case 'valueOnly':
                return formattedValue;
            default:
                throw new BadRequestException([
                    {
                        message: ErrorMessagesEnum.BALANCE_FORMAT_IS_INVALID,
                        code: ErrorCodesEnum.BALANCE_FORMAT_IS_INVALID,
                    },
                ]);
        }
    } else if (typeof balance === 'string') {
        // Remove qualquer formatação antes de converter de volta para um número
        const numericValue = parseInt(
            balance.replace(/[^\d,-]/g, '').replace(',', '.'),
            10,
        );
        return numericValue;
    }
}
