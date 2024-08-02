import {
    OnQueueActive,
    OnQueueCompleted,
    OnQueueError,
    OnQueueFailed,
    OnQueueProgress,
    OnQueueWaiting,
    Process,
    Processor,
} from '@nestjs/bull';
import { Inject } from '@nestjs/common';
import { Job } from 'bull';
import { IWalletService } from 'src/modules/wallets/domain/interfaces/wallet-service.interface';
import { Transfer } from '../../domain/entities/transfer.entity';
import { TransferStatusEnum } from '../../domain/enums/transfer-status.enum';
import { ITransferRepository } from '../../domain/interfaces/transfer-repository.interface';

@Processor('transfer')
export class TransferConsumer {
    constructor(
        @Inject('ITransferRepository')
        private readonly transferRepo: ITransferRepository,
        @Inject('IWalletService')
        private readonly walletService: IWalletService,
    ) {}

    @Process('transfer-queue')
    async transcode(job: Job) {
        for (let progress = 0; progress <= 100; progress += 1) {
            job.progress(progress);

            console.log('progress -> ', job.progress());

            const data = job.data.transfer as Transfer;

            const transfer = await this.transferRepo.findById(data.id);

            switch (transfer.status) {
                case TransferStatusEnum.CANCELED:
                    throw new Error('Transferência está cancelada.');
                    break;

                case TransferStatusEnum.SUCCEEDED:
                    throw new Error('Transferência já foi concluida.');
                    break;
                default:
                    break;
            }

            await this.transferRepo.updateStatus(
                transfer.id,
                TransferStatusEnum.IN_PROGRESS,
            );

            await new Promise((resolve) => setTimeout(resolve, 100));
        }
    }

    @OnQueueWaiting()
    async onWaiting(job: Job) {
        console.log(`${job.id} is waiting`);
        await new Promise((resolve) => setTimeout(resolve, 10000));
    }

    @OnQueueActive()
    async onActive(job: Job) {
        console.log(`on queue active ${job.id}`);
        await new Promise((resolve) => setTimeout(resolve, 5000));
    }

    @OnQueueProgress()
    async onProgress(job: Job) {
        console.log(`in progress queue ${job.id}`);
    }

    @OnQueueCompleted()
    async onCompleted(job: Job) {
        const data = job.data.transfer as Transfer;

        const transfer = await this.transferRepo.findById(data.id);

        await this.walletService.updateBalance(transfer.fromUserWalletId, {
            removeBalance: transfer.amount,
        });

        await this.walletService.updateBalance(transfer.toUserWalletId, {
            addBalance: transfer.amount,
        });

        await this.transferRepo.updateStatus(
            transfer.id,
            TransferStatusEnum.SUCCEEDED,
        );

        console.log(`completed queue ${job.id}`);
    }

    @OnQueueError()
    async onError(error: Error) {
        console.log(`error on queue`, error.message);
    }

    @OnQueueFailed()
    async onFailed(job: Job, error: Error) {
        console.log(`error on queue: `, error.message);
        const data = job.data.transfer as Transfer;

        const transfer = await this.transferRepo.findById(data.id);

        if (transfer.status !== TransferStatusEnum.CANCELED) {
            await this.transferRepo.updateStatus(
                transfer.id,
                TransferStatusEnum.FAILED,
            );
        }

        console.log(`failed job ${job.id}`);
    }
}
