import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { jwtConfigModule } from '../../../config/modules.config';
import { User } from '../../users/user.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConfigModule.secret,
    });
  }

  async validate(payload: Omit<User, 'password' | 'packages'>) {
    return {
      id: payload.id,
      email: payload.email,
    };
  }
}
