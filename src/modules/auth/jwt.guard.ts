import {
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { AuthGuard } from '@nestjs/passport';

import { of } from 'rxjs';
import { map, mergeMap, takeWhile, tap } from 'rxjs/operators';
import { IS_PUBLIC_KEY } from './decorators/isPublic.decorator';
import { UsersService } from '../users/users.service';
import { UserPayload } from './models/user-payload.model';
import { AuthRequest } from './models/auth-request-model';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(
    private reflector: Reflector,
    @Inject(UsersService) private readonly userService: UsersService,
  ) {
    super();
  }

  getRequest<T>(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req as T;
  }

  canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    const canActivate = super.canActivate(context);

    if (typeof canActivate === 'boolean') {
      return canActivate;
    }

    return of(canActivate).pipe(
      mergeMap((value) => value),
      takeWhile((value) => value),
      map(() => this.getRequest<AuthRequest>(context)),
      mergeMap((request) =>
        of(request).pipe(
          map((req) => {
            if (!req.user) {
              throw new UnauthorizedException('User was not found in request.');
            }

            return req.user;
          }),
          mergeMap((userFromJwt: UserPayload) =>
            this.userService.findUserById(userFromJwt.id),
          ),
          tap((user) => {
            request.principal = user;
          }),
        ),
      ),
      map((user) => Boolean(user)),
    );
  }
}
