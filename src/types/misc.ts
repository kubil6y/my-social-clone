import { ReactNode } from 'react';
import { User, UserFollowStats } from './user';

export interface PageProps {
  user: User;
  userFollowStats: UserFollowStats;
  children?: ReactNode;
}
