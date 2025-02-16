import { rabbitConfig } from '@backend/config';
import { RabbitRouting } from '@backend/shared/core';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class NotifyService {
  constructor(
    private readonly rabbitClient: AmqpConnection,
    @Inject(rabbitConfig.KEY)
    private readonly rabbiOptions: ConfigType<typeof rabbitConfig>
  ) {}

  public async registerUser(dto: CreateUserDto) {
    return this.rabbitClient.publish<CreateUserDto>(
      this.rabbiOptions.exchange,
      RabbitRouting.AddUser,
      { ...dto }
    );
  }
}
