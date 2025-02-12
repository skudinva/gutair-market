import { EmailSubscriberModule } from '@backend/email-subscriber';
import { NotifyConfigModule, getMongooseOptions } from '@backend/notify-config';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRootAsync(getMongooseOptions()),
    NotifyConfigModule,
    EmailSubscriberModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
