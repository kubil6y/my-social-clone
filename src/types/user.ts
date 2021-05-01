export enum UserRoles {
  root = 'root',
  user = 'user',
}

export interface User {
  _id?: string;
  newMessagePopup?: boolean;
  unreadMessage?: boolean;
  unreadNotification?: boolean;
  role?: UserRoles;
  name: string;
  email: string;
  username: string;
  profilePicUrl?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface UserFollowStats {
  _id?: string;
  follower?: any[];
  following?: any[];
  user?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
