import { Global, Injectable } from '@nestjs/common';

import * as bcrypt from 'bcryptjs';

@Injectable()
export class HashService {
  async hash(value: string): Promise<string> {
    return bcrypt.hash(value, 8);
  }

  async compare(value: string, hash: string): Promise<boolean> {
    return bcrypt.compare(value, hash);
  }
}
