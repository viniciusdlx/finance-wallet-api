import { Inject } from '@nestjs/common';
import { ITransferRepository } from '../../domain/interfaces/transfer-repository.interface';
import { TransferOutputDto } from '../../presentation/dtos/transfer-output.dto';

export class FindTransfersByUserIdUseCase {
    constructor(
        @Inject('ITransferRepository')
        private readonly transferRepository: ITransferRepository,
    ) {}

    async execute(id: string): Promise<TransferOutputDto[]> {
        const transfers = await this.transferRepository.findByUserId(id);

        const transfersMapped: TransferOutputDto[] = transfers.map((t) => {
            return {
                id: t.id,
                fromUserWalletId: t.fromUserWalletId,
                toUserWalletId: t.toUserWalletId,
                amount: t.amount,
                transferDate: t.transferDate,
                transferHour: t.transferHour,
                description: t.description,
                status: t.status,
                createdAt: t.createdAt,
                updatedAt: t.updatedAt,
            };
        });

        return transfersMapped;
    }
}
