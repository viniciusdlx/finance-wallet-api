import { BadRequestException, Inject } from '@nestjs/common';
import { ErrorCodesEnum } from 'src/shared/enums/error-codes.enum';
import { ErrorMessagesEnum } from 'src/shared/enums/error-messages.enum';
import { IWalletRepository } from '../../domain/interfaces/wallet-repository.interface';
import { WalletOutputDto } from '../../presentation/dtos/wallet-output.dto';

export class FindWalletByIdUseCase {
    constructor(
        @Inject('IWalletRepository')
        private readonly walletRepository: IWalletRepository,
    ) {}

    async execute(id: string): Promise<WalletOutputDto> {
        const wallet = await this.walletRepository.findById(id);

        if (!wallet) {
            throw new BadRequestException([
                {
                    message: ErrorMessagesEnum.WALLET_NOT_FOUND,
                    code: ErrorCodesEnum.WALLET_NOT_FOUND,
                },
            ]);
        }

        return {
            id: wallet.id,
            name: wallet.name,
            balance: wallet.balance,
            description: wallet.description,
            status: wallet.status,
            createdAt: wallet.createdAt,
            updatedAt: wallet.updatedAt,
            userId: wallet.userId,
        };
    }
}
