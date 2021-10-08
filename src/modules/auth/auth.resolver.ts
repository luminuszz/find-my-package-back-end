import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CreateSessionDTO } from './dto/create-session.dto';
import { SessionLoginResponse } from './models/session-response.model';
import { AuthService } from './auth.service';
import { Public } from './decorators/isPublic.decorator';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Mutation(() => SessionLoginResponse)
  async login(@Args('createSession') { password, email }: CreateSessionDTO) {
    return this.authService.login(email, password);
  }
}
