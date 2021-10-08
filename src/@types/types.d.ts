import { Document } from 'mongoose';
import { User } from '../modules/users/user.entity';

declare type UserDocument = User & Document;
