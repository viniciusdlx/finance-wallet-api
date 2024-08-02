import { Injectable } from '@nestjs/common';
import { ITransferService } from '../../domain/interfaces/transfer-service.interface';
import { TransferAmountDto } from '../../presentation/dtos/transfer-amount.dto';
import { TransferOutputDto } from '../../presentation/dtos/transfer-output.dto';
import { TransferCancelByIdUseCase } from '../usecases/cancel-transfer-by-id.usecase';
import { FindTransfersByUserIdUseCase } from '../usecases/find-transfers-by-user-id.usecase';
import { TransferAmountUseCase } from '../usecases/transfer-amount.usecase';

@Injectable()
export class TransferService implements ITransferService {
    constructor(
        private readonly createTransferUseCase: TransferAmountUseCase,
        private readonly findTransfersByUserIdUseCase: FindTransfersByUserIdUseCase,
        private readonly transferCancelByIdUseCase: TransferCancelByIdUseCase,
    ) {}

    async transferAmount(
        request: TransferAmountDto,
    ): Promise<TransferOutputDto> {
        return await this.createTransferUseCase.execute(request);
    }

    async findByUserId(id: string): Promise<TransferOutputDto[]> {
        return await this.findTransfersByUserIdUseCase.execute(id);
    }

    async cancelTransfer(id: string): Promise<void> {
        await this.transferCancelByIdUseCase.execute(id);
    }
}
