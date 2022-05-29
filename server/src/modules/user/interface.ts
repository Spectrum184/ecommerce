export interface IUser {
  id: string;
  username: string;
  password: string;
  email: string;
  phone?: string;
  role: string[];
  isActive: boolean;
  name?: string;
  point?: number;
  type: 'NORMAL' | 'FACEBOOK' | 'GOOGLE';
  avatar?: string;
  address?: string;
}
