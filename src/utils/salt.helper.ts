import { Injectable } from '@nestjs/common';
import { compareSync, hashSync } from 'bcrypt';

/**
 * @description password helper to encrypt, decrypt and password matching
 */
@Injectable()
export class SaltHelper {
  /**
   * @description match password is correct or not
   * @param plainPassword
   * @param passwordhash
   */
  public compare(plainPassword: string, passwordhash: string): boolean {
    return compareSync(plainPassword, passwordhash);
  }

  /**
   * @description create encrypted password and hash key
   * @param userPassword
   */
  public async generateSaltAndHash(plainPassword: string): Promise<string> {
    return hashSync(plainPassword, 10);
  }
}
