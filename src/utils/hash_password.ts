import { scryptSync } from 'crypto';

export default function hashPassword(pwd: string = ''): string {
    const hashedPwd: Buffer = scryptSync(pwd, 'admin', 24);
    return hashedPwd.toString('hex');
}
