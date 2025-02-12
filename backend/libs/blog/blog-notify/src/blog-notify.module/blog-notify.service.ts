import { rabbitConfig } from '@backend/config';
import { Post, RabbitRouting } from '@backend/shared/core';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { BlogNotifyDto } from './dto/blog-notify.dto';

@Injectable()
export class BlogNotifyService {
  constructor(
    private readonly rabbitClient: AmqpConnection,
    @Inject(rabbitConfig.KEY)
    private readonly rabbitOptions: ConfigType<typeof rabbitConfig>
  ) {}

  public async sendNewPostNotify(posts: Post[], userId: string) {
    return this.rabbitClient.publish<BlogNotifyDto>(
      this.rabbitOptions.exchange,
      RabbitRouting.SendNewPostNotify,
      { userId, posts }
    );
  }
}
