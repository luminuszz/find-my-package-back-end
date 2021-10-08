import { UserPayload } from './user-payload.model';
import { User } from '../../users/user.entity';

export class AuthRequest {
  user: UserPayload;
  principal: User;
}
