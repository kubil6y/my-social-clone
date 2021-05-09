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
  __v?: any;
}

export interface UserFollowStats {
  _id?: string;
  follower?: any[];
  following?: any[];
  user?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Comment {
  user: User;
  text: string;
  uuid: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Like {
  user: User | string;
  createdAt: Date;
}

export interface Post {
  _id: string;
  user: User;
  text: string;
  location: string;
  picUrl?: string;
  likes: Like[] | string[];
  comments: Comment[] | string[];
  createdAt: Date;
  updatedAt: Date;
  __v: any;
}
