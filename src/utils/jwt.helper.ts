import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { JwtTokenInterface } from '../interfaces/jwt.token.interface';
import { User } from '../models';

@Injectable()
export class JwtHelper {
  generateToken(tokenDto: JwtTokenInterface): string {
    const token = jwt.sign(tokenDto, process.env.JWT_SECRET || '', {
      expiresIn: process.env.JWT_EXPIRED_TIME,
    });
    return token;
  }

  /**
   * To generate jwt token for admin@socialgames.com admin-user
   * @param tokenDto contains user_id
   */
  generateAdminToken(tokenDto: JwtTokenInterface): string {
    const token = jwt.sign(tokenDto, process.env.JWT_SECRET);
    return token;
  }

  /**
   * Verifies valid auth token
   * @param token access token
   */
  async verify(token: string): Promise<false | JwtTokenInterface> {
    try {
      const payload = jwt.verify(
        token,
        process.env.JWT_SECRET,
      ) as JwtTokenInterface;

      if (payload.email !== process.env.ADMIN_EMAIL) {
        const user = await User.count({
          where: {
            id: payload.id,
          },
        });

        if (!user) {
          return false;
        }
      }
      return payload;
    } catch (e) {
      return false;
    }
  }

  /**
   * Cuts out auth token
   * from request header
   * @param request Request object
   */
  getTokenFromHeader(request: Request): string {
    let token: string =
      request.headers['x-access-token'] || request.headers['authorization'];

    if (token && token.startsWith('Bearer ')) {
      // Remove Bearer from string
      return (token = token.slice(7, token.length));
    }
    return token;
  }
}
