import { getRabbitMQOptions } from '@backend/helpers';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { Module } from '@nestjs/common';
import { EmailUserController } from './email-user.controller';

import { MailModule } from './mail-module/mail.module';

@Module({
  imports: [
    RabbitMQModule.forRootAsync(
      RabbitMQModule,
      getRabbitMQOptions('application.rabbit')
    ),
    MailModule,
  ],
  controllers: [EmailUserController],
  providers: [],
})
export class EmailUserModule {}
