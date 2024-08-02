import * as bcrypt from 'bcrypt';

export async function hashPasswordBcrypt(pass: string): Promise<string> {
    const hashPassword = await bcrypt.hash(pass, 10);
    return hashPassword;
}
