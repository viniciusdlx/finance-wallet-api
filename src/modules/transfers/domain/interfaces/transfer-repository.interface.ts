import { Transfer } from '../entities/transfer.entity';
import { TransferStatusEnum } from '../enums/transfer-status.enum';

export interface ITransferRepository {
    insert(transfer: Partial<Transfer>): Promise<Transfer>;
    findAll(): Promise<Transfer[]>;
    findById(id: string): Promise<Transfer>;
    findByUserId(userId: string): Promise<Transfer[]>;
    updateStatus(id: string, status: TransferStatusEnum): Promise<void>;
}
