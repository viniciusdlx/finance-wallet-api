import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { User } from '../../domain/entities/user.entity';

@Entity('users')
export class UserSchema implements User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ name: 'email', type: 'varchar', length: 255, unique: true })
    email: string;

    @Column({ name: 'name', type: 'varchar', length: 255 })
    name: string;

    @Column({ name: 'birth_date', type: 'date' })
    birthDate: Date;

    @CreateDateColumn({ name: 'created_at', type: 'date' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at', type: 'date' })
    updatedAt: Date;
}
