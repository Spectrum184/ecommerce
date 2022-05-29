import 'dotenv/config';

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
}

const configService = new ConfigService(process.env);

export { configService };
