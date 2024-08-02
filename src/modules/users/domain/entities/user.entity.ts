export class User {
    id: string;
    email: string;
    name: string;
    birthDate: Date;
    createdAt: Date;
    updatedAt: Date;

    constructor(user: Partial<User>) {
        this.id = user.id;
        this.email = user.email;
        this.name = user.name;
        this.birthDate = user.birthDate;
    }
}
