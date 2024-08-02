import { ExpressAdapter } from '@bull-board/express';
import { BullBoardModule } from '@bull-board/nestjs';
import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { DatabaseModule } from './config/database/database.module';
import { redis } from './config/env';
import { AuthModule } from './modules/auth/auth.module';
import { TransferModule } from './modules/transfers/transfer.module';
import { UserModule } from './modules/users/user.module';
import { WalletModule } from './modules/wallets/wallet.module';

@Module({
    imports: [
        DatabaseModule,
        BullModule.forRoot({
            redis: {
                host: redis.host,
                port: redis.port,
            },
        }),
        BullBoardModule.forRoot({
            route: '/queues',
            adapter: ExpressAdapter,
        }),
        UserModule,
        AuthModule,
        WalletModule,
        TransferModule,
    ],
})
export class AppModule {}
