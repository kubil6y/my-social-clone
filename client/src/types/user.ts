export interface User {
  email: string;
  password: string;
  username: string;
  profilePicUrl?: string;
  newMessagePopup?: boolean;
  unreadMessage?: boolean;
  unreadNotification?: boolean;
  role?: string;
}
