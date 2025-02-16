import { EmailUserModule } from '@backend/email-subscriber';
import { NotifyConfigModule } from '@backend/notify-config';
import { Module } from '@nestjs/common';

@Module({
  imports: [NotifyConfigModule, EmailUserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
