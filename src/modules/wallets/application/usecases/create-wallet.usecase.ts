import { Inject } from '@nestjs/common';
import { BadRequestException } from 'src/shared/exceptions/bad-request.exception';
import { Wallet } from '../../domain/entities/wallet.entity';
import { IWalletRepository } from '../../domain/interfaces/wallet-repository.interface';
import { validateRequestCreateWallet } from '../../infra/validators/validate-request-create-wallet';
import { CreateWalletDto } from '../../presentation/dtos/create-wallet.dto';
import { WalletOutputDto } from '../../presentation/dtos/wallet-output.dto';

export class CreateWalletUseCase {
    constructor(
        @Inject('IWalletRepository')
        private readonly walletRepository: IWalletRepository,
    ) {}

    async execute(request: CreateWalletDto): Promise<WalletOutputDto> {
        await this.validate(request);

        const newWallet = new Wallet({
            name: request.name,
            description: request.description,
            userId: request.userId,
        });

        const createdWallet = await this.walletRepository.insert(newWallet);

        return {
            id: createdWallet.id,
            name: createdWallet.name,
            description: createdWallet.description,
            balance: createdWallet.balance,
            status: createdWallet.status,
            createdAt: createdWallet.createdAt,
            updatedAt: createdWallet.updatedAt,
            userId: createdWallet.userId,
        };
    }

    async validate(req: CreateWalletDto): Promise<void> {
        const validateRequest = await validateRequestCreateWallet(req);

        const allErrors = [...validateRequest];

        if (allErrors.length > 0) {
            throw new BadRequestException(allErrors);
        }
    }
}
