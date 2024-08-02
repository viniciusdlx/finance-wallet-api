import { InjectQueue } from '@nestjs/bull';
import { Inject } from '@nestjs/common';
import { Queue } from 'bull';
import { IWalletService } from 'src/modules/wallets/domain/interfaces/wallet-service.interface';
import { ErrorCodesEnum } from 'src/shared/enums/error-codes.enum';
import { ErrorMessagesEnum } from 'src/shared/enums/error-messages.enum';
import { BadRequestException } from 'src/shared/exceptions/bad-request.exception';
import { ErrorMessageCode } from 'src/shared/types/error-message-code';
import { Transfer } from '../../domain/entities/transfer.entity';
import { TransferStatusEnum } from '../../domain/enums/transfer-status.enum';
import { ITransferRepository } from '../../domain/interfaces/transfer-repository.interface';
import { validateRequestCreateTransfer } from '../../infra/validators/validate-request-create-transfer';
import { TransferAmountDto } from '../../presentation/dtos/transfer-amount.dto';
import { TransferOutputDto } from '../../presentation/dtos/transfer-output.dto';

export class TransferAmountUseCase {
    constructor(
        @Inject('ITransferRepository')
        private readonly transferRepository: ITransferRepository,
        @Inject('IWalletService')
        private readonly walletService: IWalletService,
        @InjectQueue('transfer')
        private transferQueue: Queue,
    ) {}

    async execute(request: TransferAmountDto): Promise<TransferOutputDto> {
        await this.validate(request);

        const newTransfer = new Transfer({
            fromUserWalletId: request.fromUserWalletId,
            toUserWalletId: request.toUserWalletId,
            amount: request.amount,
            description: request.description,
            status: TransferStatusEnum.PENDING,
        });

        const createdTransfer =
            await this.transferRepository.insert(newTransfer);

        await this.transferQueue.add(
            'transfer-queue',
            {
                transfer: createdTransfer,
            },
            { delay: 3 * 1000, attempts: 3 },
        );

        return {
            id: createdTransfer.id,
            fromUserWalletId: createdTransfer.fromUserWalletId,
            toUserWalletId: createdTransfer.toUserWalletId,
            amount: createdTransfer.amount,
            transferDate: createdTransfer.transferDate,
            transferHour: createdTransfer.transferHour,
            description: createdTransfer.description,
            status: createdTransfer.status,
            createdAt: createdTransfer.createdAt,
            updatedAt: createdTransfer.updatedAt,
        };
    }

    async validateBusinessRules(
        req: TransferAmountDto,
    ): Promise<ErrorMessageCode[]> {
        const wallet = await this.walletService.findById(req.fromUserWalletId);

        const errors: ErrorMessageCode = [];

        if (req.amount <= 0) {
            errors.push({
                message: ErrorMessagesEnum.AMOUNT_IS_INVALID,
                code: ErrorCodesEnum.AMOUNT_IS_INVALID,
            });
        }

        if ((wallet.balance as number) < req.amount) {
            errors.push({
                message: ErrorMessagesEnum.INSUFFICIENT_BALANCE,
                code: ErrorCodesEnum.INSUFFICIENT_BALANCE,
            });
        }

        return errors;
    }

    async validate(req: TransferAmountDto): Promise<void> {
        const validateRequest = await validateRequestCreateTransfer(req);
        const validateBusinessRules = await this.validateBusinessRules(req);

        const allErrors = [...validateRequest, ...validateBusinessRules];

        if (allErrors.length > 0) {
            throw new BadRequestException(allErrors);
        }
    }
}
