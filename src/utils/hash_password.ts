import { scryptSync } from 'crypto';

export default function hashPassword(pwd: string = ''): string {
    const hashedPwd: Buffer = scryptSync(pwd, 'admin', 24);
    return hashedPwd.toString('hex');
}

export function verifyPassword(storedHash: string, passwordToCheck: string): boolean {
    const [salt, hash] = storedHash.split(':'); // Separamos la sal y el hash
    const hashedBuffer: Buffer = scryptSync(passwordToCheck, salt, 24);
    const hashedPassword = hashedBuffer.toString('hex');
    return hash === hashedPassword; // Comparamos los hashes
}
