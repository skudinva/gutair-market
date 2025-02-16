import { CreateUserDto } from '@backend/authentication';
import { NotifyConfig } from '@backend/notify-config';
import { MailerService } from '@nestjs-modules/mailer';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { EMAIL_ADD_NEW_USER_SUBJECT } from './mail.constant';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  @Inject(NotifyConfig.KEY)
  private readonly notifyConfig: ConfigType<typeof NotifyConfig>;

  public async sendNotifyNewUser(user: CreateUserDto) {
    await this.mailerService.sendMail({
      from: this.notifyConfig.mail.from,
      to: user.email,
      subject: EMAIL_ADD_NEW_USER_SUBJECT,
      template: './add-user',
      context: {
        user: user.name,
        email: user.email,
        password: user.password,
      },
    });
  }
}
