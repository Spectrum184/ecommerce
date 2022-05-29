import 'dotenv/config';
import { IJwtConfig } from './interface';

class ConfigService {
  constructor(private env: { [key: string]: string | undefined }) {}

  private getValue(key: string, throwOnMissing = true) {
    const value = this.env[key];
    if (!value && throwOnMissing) {
      throw new Error(`config error - missing env.${key}`);
    }

    return value;
  }

  public getPort(): number {
    return Number(this.getValue('PORT', false) || 5000);
  }

  public getIsProduction(): boolean {
    const mode = this.getValue('NODE_ENV', false);
    return mode !== 'development';
  }

  public getJwtConfig(isRefresh: boolean): IJwtConfig {
    return isRefresh
      ? {
          secret: this.getValue('JWT_SECRET_REFRESH'),
          signOptions: {
            expiresIn: this.getValue('JWT_REFRESH_EXPIRES_IN'),
          },
        }
      : {
          secret: this.getValue('JWT_SECRET_ACCESS'),
          signOptions: {
            expiresIn: this.getValue('JWT_ACCESS_EXPIRES_IN'),
          },
        };
  }
}

const configService = new ConfigService(process.env);

export { configService };
