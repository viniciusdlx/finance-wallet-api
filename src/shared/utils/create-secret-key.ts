import * as crypto from 'crypto';

export function createSecretKey() {
    const secret = crypto.randomBytes(64).toString('hex');
    console.log(secret);
    return secret;
}
