import { TransferAmountDto } from '../../presentation/dtos/transfer-amount.dto';
import { TransferOutputDto } from '../../presentation/dtos/transfer-output.dto';

export interface ITransferService {
    transferAmount(request: TransferAmountDto): Promise<TransferOutputDto>;
    findByUserId(id: string): Promise<TransferOutputDto[]>;
    cancelTransfer(id: string): Promise<void>;
}
