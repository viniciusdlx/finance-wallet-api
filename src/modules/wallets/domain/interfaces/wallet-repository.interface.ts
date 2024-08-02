import { Wallet } from '../entities/wallet.entity';
import { WalletStatusEnum } from '../enums/wallet-status.enum';

export interface IWalletRepository {
    insert(wallet: Partial<Wallet>): Promise<Wallet>;
    findAll(): Promise<Wallet[]>;
    findById(id: string): Promise<Wallet>;
    findByUserId(id: string): Promise<Wallet[]>;
    update(id: string, wallet: Partial<Wallet>): Promise<void>;
    updateStatus(id: string, status: WalletStatusEnum): Promise<void>;
    updateBalance(id: string, balance: number): Promise<void>;
}
