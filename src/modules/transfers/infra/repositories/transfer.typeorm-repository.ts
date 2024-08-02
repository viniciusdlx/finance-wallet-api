import { InjectRepository } from '@nestjs/typeorm';
import { defaultInternalServerError } from 'src/shared/utils/default-internal-server-error';
import { DataSource, Repository } from 'typeorm';
import { Transfer } from '../../domain/entities/transfer.entity';
import { TransferStatusEnum } from '../../domain/enums/transfer-status.enum';
import { ITransferRepository } from '../../domain/interfaces/transfer-repository.interface';
import { TransferSchema } from '../schemas/transfer.schema';

export class TransferTypeOrmRepository implements ITransferRepository {
    constructor(
        @InjectRepository(TransferSchema)
        private readonly transferRepository: Repository<TransferSchema>,
        private readonly dataSource: DataSource,
    ) {}

    async insert(transfer: Partial<Transfer>): Promise<Transfer> {
        try {
            const newTransfer = this.transferRepository.create(transfer);

            return await this.transferRepository.save(newTransfer);
        } catch (error) {
            defaultInternalServerError();
        }
    }
    async findAll(): Promise<Transfer[]> {
        throw new Error('Method not implemented.');
    }
    async findById(id: string): Promise<Transfer> {
        try {
            return await this.transferRepository.findOneBy({
                id: id,
            });
        } catch (error) {
            defaultInternalServerError();
        }
    }

    async findByUserId(userId: string): Promise<Transfer[]> {
        try {
            return await this.transferRepository.find({
                where: [
                    {
                        fromUserWallet: {
                            userId: userId,
                        },
                    },
                    {
                        toUserWallet: {
                            userId: userId,
                        },
                    },
                ],
                order: {
                    createdAt: 'DESC',
                },
            });
        } catch (error) {
            defaultInternalServerError();
        }
    }

    async updateStatus(id: string, status: TransferStatusEnum): Promise<void> {
        try {
            await this.transferRepository.update(id, { status: status });
        } catch (error) {
            defaultInternalServerError();
        }
    }
}
