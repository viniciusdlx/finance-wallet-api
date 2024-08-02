import { User } from 'src/modules/users/domain/entities/user.entity';
import { WalletStatusEnum } from '../enums/wallet-status.enum';

export class Wallet {
    id: string;
    name: string;
    description: string;
    balance: number;
    status: WalletStatusEnum;
    createdAt: Date;
    updatedAt: Date;
    userId: string;
    user?: User;

    constructor(w: Partial<Wallet>) {
        this.name = w.name;
        this.description = w.description;
        this.balance = w.balance = 0;
        this.status = w.status = WalletStatusEnum.ACTIVE;
        this.userId = w.userId;
    }
}
