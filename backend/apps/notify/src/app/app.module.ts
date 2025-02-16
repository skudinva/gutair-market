import { EmailSubscriberModule } from '@backend/email-subscriber';
import { NotifyConfigModule } from '@backend/notify-config';
import { Module } from '@nestjs/common';

@Module({
  imports: [NotifyConfigModule, EmailSubscriberModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
