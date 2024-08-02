import { Injectable } from '@nestjs/common';
import { IWalletService } from '../../domain/interfaces/wallet-service.interface';
import { CreateWalletDto } from '../../presentation/dtos/create-wallet.dto';
import { UpdateWalletBalanceDto } from '../../presentation/dtos/update-wallet-balance.dto';
import { WalletOutputDto } from '../../presentation/dtos/wallet-output.dto';
import { CreateWalletUseCase } from '../usecases/create-wallet.usecase';
import { FindWalletByIdUseCase } from '../usecases/find-wallet-by-id.usecase';
import { FindWalletsByUserIdUseCase } from '../usecases/find-wallets-by-user-id.usecase';
import { UpdateWalletBalanceUseCase } from '../usecases/update-wallet-balance.usecase';

@Injectable()
export class WalletService implements IWalletService {
    constructor(
        private readonly createWalletUseCase: CreateWalletUseCase,
        private readonly findWalletsByUserIdUseCase: FindWalletsByUserIdUseCase,
        private readonly updateWalletBalanceUseCase: UpdateWalletBalanceUseCase,
        private readonly findWalletByIdUseCase: FindWalletByIdUseCase,
    ) {}

    async create(request: CreateWalletDto): Promise<WalletOutputDto> {
        return await this.createWalletUseCase.execute(request);
    }

    async findByUserId(id: string): Promise<WalletOutputDto[]> {
        return await this.findWalletsByUserIdUseCase.execute(id);
    }

    async updateBalance(
        id: string,
        request: UpdateWalletBalanceDto,
    ): Promise<void> {
        await this.updateWalletBalanceUseCase.execute(id, request);
    }

    async findById(id: string): Promise<WalletOutputDto> {
        return await this.findWalletByIdUseCase.execute(id);
    }
}
