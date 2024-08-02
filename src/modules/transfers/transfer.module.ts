import { BullMQAdapter } from '@bull-board/api/bullMQAdapter';
import { BullBoardModule } from '@bull-board/nestjs';
import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WalletModule } from '../wallets/wallet.module';
import { TransferService } from './application/services/transfer.service';
import { TransferCancelByIdUseCase } from './application/usecases/cancel-transfer-by-id.usecase';
import { FindTransfersByUserIdUseCase } from './application/usecases/find-transfers-by-user-id.usecase';
import { TransferAmountUseCase } from './application/usecases/transfer-amount.usecase';
import { TransferConsumer } from './infra/consumers/transfer.consumer';
import { TransferTypeOrmRepository } from './infra/repositories/transfer.typeorm-repository';
import { TransferSchema } from './infra/schemas/transfer.schema';
import { TransferController } from './presentation/controllers/transfer.controller';

export const ITransferRepository = {
    provide: 'ITransferRepository',
    useClass: TransferTypeOrmRepository,
};

export const ITransferService = {
    provide: 'ITransferService',
    useClass: TransferService,
};

@Module({
    imports: [
        TypeOrmModule.forFeature([TransferSchema]),
        BullModule.registerQueue({
            name: 'transfer',
        }),
        BullBoardModule.forFeature({
            name: 'transfer',
            adapter: BullMQAdapter,
        }),
        WalletModule,
    ],
    controllers: [TransferController],
    providers: [
        TransferService,
        ITransferRepository,
        ITransferService,
        TransferTypeOrmRepository,
        TransferAmountUseCase,
        FindTransfersByUserIdUseCase,
        TransferConsumer,
        TransferCancelByIdUseCase,
    ],
})
export class TransferModule {}
