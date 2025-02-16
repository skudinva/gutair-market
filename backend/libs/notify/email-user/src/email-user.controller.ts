import { CreateUserDto } from '@backend/account-notify';
import { RabbitRouting } from '@backend/shared/core';
import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { Controller } from '@nestjs/common';
import { MailService } from './mail-module/mail.service';

@Controller()
export class EmailUserController {
  constructor(private readonly mailService: MailService) {}

  @RabbitSubscribe({
    exchange: process.env.RABBIT_EXCHANGE,
    routingKey: RabbitRouting.AddUser,
    queue: process.env.RABBIT_QUEUE,
  })
  public async create(newUserDto: CreateUserDto) {
    await this.mailService.sendNotifyNewUser(newUserDto);
  }
}
