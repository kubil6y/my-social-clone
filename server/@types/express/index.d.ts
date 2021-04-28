import { DocumentType } from '@typegoose/typegoose';
import { IUser } from '../../models';

declare global {
  namespace Express {
    interface Request {
      user?: DocumentType<IUser>;
    }
  }
}
