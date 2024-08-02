import { Wallet } from 'src/modules/wallets/domain/entities/wallet.entity';
import { TransferStatusEnum } from '../enums/transfer-status.enum';

export class Transfer {
    id: string;
    fromUserWalletId: string;
    toUserWalletId: string;
    amount: number;
    transferDate: Date;
    transferHour: string;
    description: string;
    status: TransferStatusEnum;
    createdAt: Date;
    updatedAt: Date;
    fromUserWallet?: Wallet;
    toUserWallet?: Wallet;

    constructor(t: Partial<Transfer>) {
        this.fromUserWalletId = t.fromUserWalletId;
        this.toUserWalletId = t.toUserWalletId;
        this.amount = t.amount;
        this.status = t.status;
        this.description = t.description;
    }
}
