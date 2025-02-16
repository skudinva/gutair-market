import { getRabbitMQOptions } from '@backend/helpers';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { Module } from '@nestjs/common';
import { EmailSubscriberController } from './email-subscriber.controller';

import { MailModule } from './mail-module/mail.module';

@Module({
  imports: [
    RabbitMQModule.forRootAsync(
      RabbitMQModule,
      getRabbitMQOptions('application.rabbit')
    ),
    MailModule,
  ],
  controllers: [EmailSubscriberController],
  providers: [],
})
export class EmailSubscriberModule {}
