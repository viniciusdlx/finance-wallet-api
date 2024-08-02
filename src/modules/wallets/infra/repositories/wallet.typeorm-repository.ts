import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { defaultInternalServerError } from 'src/shared/utils/default-internal-server-error';
import { Repository } from 'typeorm';
import { Wallet } from '../../domain/entities/wallet.entity';
import { WalletStatusEnum } from '../../domain/enums/wallet-status.enum';
import { IWalletRepository } from '../../domain/interfaces/wallet-repository.interface';
import { WalletSchema } from '../schemas/wallet.schema';

@Injectable()
export class WalletTypeOrmRepository implements IWalletRepository {
    constructor(
        @InjectRepository(WalletSchema)
        private readonly walletRepository: Repository<WalletSchema>,
    ) {}

    async insert(wallet: Partial<Wallet>): Promise<Wallet> {
        try {
            return await this.walletRepository.save(wallet);
        } catch (error) {
            defaultInternalServerError();
        }
    }

    async findById(id: string): Promise<Wallet> {
        try {
            return await this.walletRepository.findOneBy({ id: id });
        } catch (error) {
            defaultInternalServerError();
        }
    }

    async findAll(): Promise<Wallet[]> {
        throw new Error('Method not implemented.');
    }
    async findByUserId(id: string): Promise<Wallet[]> {
        try {
            return await this.walletRepository.findBy({ userId: id });
        } catch (error) {
            defaultInternalServerError();
        }
    }
    async update(id: string, wallet: Partial<Wallet>): Promise<void> {
        throw new Error('Method not implemented.');
    }
    async updateStatus(id: string, status: WalletStatusEnum): Promise<void> {
        throw new Error('Method not implemented.');
    }
    async updateBalance(id: string, balance: number): Promise<void> {
        try {
            await this.walletRepository.update(id, { balance: balance });
        } catch (error) {
            defaultInternalServerError();
        }
    }
}
