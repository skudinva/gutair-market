import { getRabbitMQOptions } from '@backend/helpers';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { Module } from '@nestjs/common';
import { BlogNotifyService } from './blog-notify.service';

@Module({
  imports: [
    RabbitMQModule.forRootAsync(RabbitMQModule, getRabbitMQOptions('rabbit')),
  ],
  providers: [BlogNotifyService],
  exports: [BlogNotifyService],
})
export class BlogNotifyModule {}
