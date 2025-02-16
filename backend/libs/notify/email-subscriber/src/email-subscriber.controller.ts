import { CreateUserDto } from '@backend/authentication';
import { RabbitRouting } from '@backend/shared/core';
import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { Controller } from '@nestjs/common';
import { MailService } from './mail-module/mail.service';

@Controller()
export class EmailSubscriberController {
  constructor(private readonly mailService: MailService) {}

  @RabbitSubscribe({
    exchange: process.env.RABBIT_EXCHANGE,
    routingKey: RabbitRouting.AddSubscriber,
    queue: process.env.RABBIT_QUEUE,
  })
  public async create(newUserDto: CreateUserDto) {
    await this.mailService.sendNotifyNewUser(newUserDto);
  }
}
