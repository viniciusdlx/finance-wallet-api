import { TransferSchema } from 'src/modules/transfers/infra/schemas/transfer.schema';
import { UserSchema } from 'src/modules/users/infra/schemas/user.schema';
import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { Wallet } from '../../domain/entities/wallet.entity';
import { WalletStatusEnum } from '../../domain/enums/wallet-status.enum';

@Entity('wallets')
export class WalletSchema implements Wallet {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column({
        name: 'description',
        type: 'text',
        nullable: true,
        default: null,
    })
    description: string;

    @Column({ name: 'balance', type: 'int', width: 11, default: 0 })
    balance: number;

    @Column({
        type: 'enum',
        enum: WalletStatusEnum,
        default: WalletStatusEnum.ACTIVE,
    })
    status: WalletStatusEnum;

    @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
    updatedAt: Date;

    @Column({ name: 'user_id', type: 'uuid' })
    userId: string;

    @ManyToOne(() => UserSchema, (user) => user.id)
    @JoinColumn({ name: 'user_id' })
    user?: UserSchema;

    @OneToMany(() => TransferSchema, (transfer) => transfer.fromUserWallet)
    outgoingTransfers?: TransferSchema[];

    @OneToMany(() => TransferSchema, (transfer) => transfer.toUserWallet)
    incomingTransfers?: TransferSchema[];
}
