import { Inject } from '@nestjs/common';
import { ITransferRepository } from '../../domain/interfaces/transfer-repository.interface';
import { TransferOutputDto } from '../../presentation/dtos/transfer-output.dto';

export class FindAllTransfersUseCase {
    constructor(
        @Inject('ITransferRepository')
        private readonly transferRepository: ITransferRepository,
    ) {}

    async exeute(): Promise<TransferOutputDto[]> {
        return;
    }
}
