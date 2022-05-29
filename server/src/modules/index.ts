import { Module } from '@nestjs/common';
import { ThrottlerModule } from '@nestjs/throttler';
import { TestModule } from './common';

@Module({
  imports: [
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 100,
    }),
    TestModule,
  ],
})
export class AppModule {}
