import { User } from 'src/modules/users/domain/entities/user.entity';

export class Auth {
    id: string;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
    userId: string;
    user?: User;

    constructor(auth: Partial<Auth>) {
        this.id = auth.id;
        this.email = auth.email;
        this.password = auth.password;
        this.userId = auth.userId;
    }
}
