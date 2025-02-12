import { NotifyModule } from '@backend/account-notify';
import { AuthenticationModule } from '@backend/authentication';
import { BlogUserModule } from '@backend/blog-user';
import { AccountConfigModule, getMongooseOptions } from '@backend/config';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    BlogUserModule,
    AuthenticationModule,
    AccountConfigModule,
    MongooseModule.forRootAsync(getMongooseOptions()),
    NotifyModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
