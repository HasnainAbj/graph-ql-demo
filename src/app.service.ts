import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getPong(): any {
    return 'PONG';
  }
}
