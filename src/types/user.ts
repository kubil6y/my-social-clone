export interface User {
  newMessagePopup: boolean;
  unreadMessage: boolean;
  unreadNotification: boolean;
  role: string;
  _id: string;
  name: string;
  email: string;
  username: string;
  profilePicUrl: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserFollowStats {
  follower: [];
  following: [];
  _id: string;
  user: string;
  createdAt: Date;
  updatedAt: Date;
}
