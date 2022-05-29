export interface IJwtConfig {
  secret: string;
  signOptions: {
    expiresIn: string;
  };
}

export interface ISessionConfig {
  secret: string;
}

export interface IRedisConfig {
  host: string;
  port: number;
  ttl: number;
}
