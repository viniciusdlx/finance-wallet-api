import { Inject } from '@nestjs/common';
import { ErrorCodesEnum } from 'src/shared/enums/error-codes.enum';
import { ErrorMessagesEnum } from 'src/shared/enums/error-messages.enum';
import { BadRequestException } from 'src/shared/exceptions/bad-request.exception';
import { IWalletRepository } from '../../domain/interfaces/wallet-repository.interface';
import { UpdateWalletBalanceDto } from '../../presentation/dtos/update-wallet-balance.dto';

export class UpdateWalletBalanceUseCase {
    constructor(
        @Inject('IWalletRepository')
        private readonly walletRepository: IWalletRepository,
    ) {}

    async execute(id: string, request: UpdateWalletBalanceDto): Promise<void> {
        const wallet = await this.walletRepository.findById(id);

        if (!wallet) {
            throw new BadRequestException([
                {
                    message: ErrorMessagesEnum.WALLET_NOT_FOUND,
                    code: ErrorCodesEnum.WALLET_NOT_FOUND,
                },
            ]);
        }

        if (request.addBalance) {
            wallet.balance += request.addBalance;
        }

        if (request.removeBalance) {
            wallet.balance -= request.removeBalance;
        }

        await this.walletRepository.updateBalance(wallet.id, wallet.balance);
    }
}
