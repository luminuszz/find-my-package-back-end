import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UsersService } from '../users/users.service';
import { HashService } from '../../shared/providers/hash/hash.service';
import { UserPayload } from './models/user-payload.model';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly hashService: HashService,
    private readonly JwtService: JwtService,
  ) {}

  async login(email: string, password: string) {
    const verifyUser = await this.usersService.findUserByEmail(email);

    if (!verifyUser) throw new BadRequestException('invalid credentials');

    const isValidPassword = await this.hashService.compare(
      password,
      verifyUser.password,
    );

    if (!isValidPassword) throw new BadRequestException('invalid credentials');

    const payload: UserPayload = {
      id: verifyUser._id,
      email: verifyUser.email,
    };

    const token = this.JwtService.sign(payload);

    return {
      token,
    };
  }
}
