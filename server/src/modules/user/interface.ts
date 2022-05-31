export enum RoleEnum {
  User = 'USER',
  Admin = 'ADMIN',
  Mod = 'MOD',
}

export interface IUser {
  id: string;
  username: string;
  email: string;
  phone?: string;
  role: RoleEnum.Admin | RoleEnum.User | RoleEnum.Mod;
  isActive: boolean;
  name?: string;
  point?: number;
  type: 'NORMAL' | 'FACEBOOK' | 'GOOGLE';
  avatar?: string;
  address?: string;
}
