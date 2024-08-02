import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WalletService } from './application/services/wallet.service';
import { CreateWalletUseCase } from './application/usecases/create-wallet.usecase';
import { FindWalletByIdUseCase } from './application/usecases/find-wallet-by-id.usecase';
import { FindWalletsByUserIdUseCase } from './application/usecases/find-wallets-by-user-id.usecase';
import { UpdateWalletBalanceUseCase } from './application/usecases/update-wallet-balance.usecase';
import { WalletTypeOrmRepository } from './infra/repositories/wallet.typeorm-repository';
import { WalletSchema } from './infra/schemas/wallet.schema';
import { WalletController } from './presentation/controllers/wallet.controller';

export const IWalletRepository = {
    provide: 'IWalletRepository',
    useClass: WalletTypeOrmRepository,
};

export const IWalletService = {
    provide: 'IWalletService',
    useClass: WalletService,
};

@Module({
    imports: [TypeOrmModule.forFeature([WalletSchema])],
    controllers: [WalletController],
    providers: [
        WalletService,
        IWalletRepository,
        IWalletService,
        WalletTypeOrmRepository,
        CreateWalletUseCase,
        FindWalletsByUserIdUseCase,
        UpdateWalletBalanceUseCase,
        FindWalletByIdUseCase,
    ],
    exports: [IWalletService],
})
export class WalletModule {}
