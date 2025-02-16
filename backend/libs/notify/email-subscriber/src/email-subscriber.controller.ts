import { RabbitRouting } from '@backend/shared/core';
import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { Controller } from '@nestjs/common';
import { CreateSubscriberDto } from './dto/create-subscriber.dto';
import { NotifyDto } from './dto/notify.dto';
import { EmailSubscriberService } from './email-subscriber.service';
import { MailService } from './mail-module/mail.service';

@Controller()
export class EmailSubscriberController {
  constructor(
    private readonly subscriberService: EmailSubscriberService,
    private readonly mailService: MailService
  ) {}

  @RabbitSubscribe({
    exchange: process.env.RABBIT_EXCHANGE,
    routingKey: RabbitRouting.AddSubscriber,
    queue: process.env.RABBIT_QUEUE,
  })
  public async create(subscriber: CreateSubscriberDto) {
    await this.subscriberService.addSubscriber(subscriber);
    await this.mailService.sendNotifyNewSubscriber(subscriber);
  }

  @RabbitSubscribe({
    exchange: 'shop.notify',
    routingKey: RabbitRouting.SendNewProductNotify,
    queue: 'shop.notify.send',
  })
  public async sendNewProductNotify(dto: NotifyDto) {
    const { products } = dto;
    const subscribers = await this.subscriberService.getAllSubscribers();
    subscribers.map(async (subscriber) => {
      await this.mailService.sendProductsToSubscriber(
        products,
        subscriber.toPOJO()
      );
    });
  }
}
