import { Inject } from '@nestjs/common';
import { TransferStatusEnum } from '../../domain/enums/transfer-status.enum';
import { ITransferRepository } from '../../domain/interfaces/transfer-repository.interface';

export class TransferCancelByIdUseCase {
    constructor(
        @Inject('ITransferRepository')
        private readonly transferRepository: ITransferRepository,
    ) {}

    async execute(id: string): Promise<void> {
        await this.transferRepository.updateStatus(
            id,
            TransferStatusEnum.CANCELED,
        );
    }
}
