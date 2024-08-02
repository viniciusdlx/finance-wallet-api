import { User } from 'src/modules/users/domain/entities/user.entity';
import { UserSchema } from 'src/modules/users/infra/schemas/user.schema';
import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { Auth } from '../../domain/entities/auth.entity';

@Entity('auth')
export class AuthSchema implements Auth {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ name: 'email', type: 'varchar', length: 255, unique: true })
    email: string;

    @Column({ name: 'password', type: 'text' })
    password: string;

    @CreateDateColumn({ name: 'created_at', type: 'date' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at', type: 'date' })
    updatedAt: Date;

    @Column({ name: 'user_id', type: 'uuid' })
    userId: string;

    @OneToOne(() => UserSchema, (user) => user.id)
    @JoinColumn({ name: 'user_id' })
    user: User;
}
