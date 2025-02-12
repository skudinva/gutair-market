import { getRabbitMQOptions } from '@backend/helpers';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { Module } from '@nestjs/common';
import { NotifyService } from './notify.service';

@Module({
  imports: [
    RabbitMQModule.forRootAsync(RabbitMQModule, getRabbitMQOptions('rabbit')),
  ],
  providers: [NotifyService],
  exports: [NotifyService],
})
export class NotifyModule {}
