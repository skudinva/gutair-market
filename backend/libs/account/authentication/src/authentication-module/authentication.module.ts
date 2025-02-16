import { NotifyModule } from '@backend/account-notify';
import { getJwtOptions } from '@backend/config';
import { ShopUserModule } from '@backend/shop-user';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { JwtAccessStrategy } from '../strategies/jwt-access.strategy';
import { LocalStrategy } from '../strategies/local.strategy';
import { AuthenticationController } from './authentication.controller';
import { AuthenticationService } from './authentication.service';
@Module({
  imports: [
    ShopUserModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: getJwtOptions,
    }),
    NotifyModule,
  ],
  controllers: [AuthenticationController],
  providers: [AuthenticationService, JwtAccessStrategy, LocalStrategy],
})
export class AuthenticationModule {}
