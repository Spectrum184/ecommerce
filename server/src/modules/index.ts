import { Module } from '@nestjs/common';
import { TestModule } from './common';

@Module({
  imports: [TestModule],
})
export class AppModule {}
