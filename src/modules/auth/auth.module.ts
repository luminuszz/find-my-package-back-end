import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { JwtModule } from '@nestjs/jwt';
import { jwtConfigModule } from '../../config/modules.config';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from '../users/users.module';
import { HashModule } from '../../shared/providers/hash/hash.module';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    PassportModule,
    JwtModule.register(jwtConfigModule),
    UsersModule,
    HashModule,
  ],
  providers: [AuthService, AuthResolver, JwtStrategy],
})
export class AuthModule {}
