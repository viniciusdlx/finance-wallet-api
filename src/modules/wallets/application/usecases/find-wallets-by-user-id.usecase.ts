import { Inject } from '@nestjs/common';
import { formatBalance } from 'src/shared/utils/format-balance';
import { IWalletRepository } from '../../domain/interfaces/wallet-repository.interface';
import { WalletOutputDto } from '../../presentation/dtos/wallet-output.dto';

export class FindWalletsByUserIdUseCase {
    constructor(
        @Inject('IWalletRepository')
        private readonly walletRepository: IWalletRepository,
    ) {}

    async execute(id: string): Promise<WalletOutputDto[]> {
        const wallets = await this.walletRepository.findByUserId(id);

        const walletsMapped: WalletOutputDto[] = wallets.map((user) => {
            const balance = formatBalance(user.balance, 'withCurrency');

            return {
                id: user.id,
                name: user.name,
                balance: balance,
                description: user.description,
                status: user.status,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt,
                userId: user.userId,
            };
        });

        return walletsMapped;
    }
}
