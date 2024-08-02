import { WalletSchema } from 'src/modules/wallets/infra/schemas/wallet.schema';
import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { Transfer } from '../../domain/entities/transfer.entity';
import { TransferStatusEnum } from '../../domain/enums/transfer-status.enum';

@Entity('transfers')
export class TransferSchema implements Transfer {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ name: 'from_user_wallet_id', type: 'uuid' })
    fromUserWalletId: string;

    @Column({ name: 'to_user_wallet_id', type: 'uuid' })
    toUserWalletId: string;

    @Column({ name: 'amount', type: 'int', width: 11 })
    amount: number;

    @Column({
        name: 'transfer_data',
        type: 'date',
        default: new Date().toLocaleDateString('sv-SE', {
            dateStyle: 'short',
        }),
    })
    transferDate: Date;

    @Column({
        name: 'transfer_hour',
        type: 'varchar',
        length: 8,
        default: new Date().toLocaleTimeString('pt-BR', {
            timeStyle: 'medium',
        }),
    })
    transferHour: string;

    @Column({
        name: 'description',
        type: 'text',
        nullable: true,
        default: null,
    })
    description: string;

    @Column({ name: 'status', type: 'enum', enum: TransferStatusEnum })
    status: TransferStatusEnum;

    @CreateDateColumn({
        name: 'created_at',
        type: 'timestamp without time zone',
    })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
    updatedAt: Date;

    @ManyToOne(() => WalletSchema, (wallet) => wallet.id)
    @JoinColumn({ name: 'from_user_wallet_id' })
    fromUserWallet?: WalletSchema;

    @ManyToOne(() => WalletSchema, (wallet) => wallet.id)
    @JoinColumn({ name: 'to_user_wallet_id' })
    toUserWallet?: WalletSchema;
}
