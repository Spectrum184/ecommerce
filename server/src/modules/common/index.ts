import { Module } from '@nestjs/common';
import { AppController } from './controller';
import { AppService } from './services';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})
export class TestModule {}
