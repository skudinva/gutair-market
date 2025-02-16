import {
  AuthenticationResponseMessage,
  CreateUserDto,
  LoggedUserRdo,
  LoginUserDto,
  RegisterUserDto,
  UpdateUserDto,
  UserRdo,
} from '@backend/authentication';
import { HttpService } from '@nestjs/axios';
import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Req,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';
import 'multer';
import { ApiSection, ApplicationServiceURL } from './app.config';
import { AppService } from './app.service';
import { AxiosExceptionFilter } from './filters/axios-exception.filter';
import { CheckAuthGuard } from './guards/check-auth.guard';

@Controller('users')
@UseFilters(AxiosExceptionFilter)
@ApiTags(ApiSection.User)
export class UsersController {
  constructor(
    private readonly httpService: HttpService,
    private readonly appService: AppService
  ) {}

  @Post('register')
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: AuthenticationResponseMessage.UserCreated,
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: AuthenticationResponseMessage.UserExist,
  })
  public async create(@Body() dto: RegisterUserDto) {
    const newUserDto = plainToInstance(CreateUserDto, {
      name: dto.name,
      email: dto.email,
      password: dto.password,
    });

    const { data } = await this.httpService.axiosRef.post(
      `${ApplicationServiceURL.Auth}/register`,
      newUserDto
    );

    return data;
  }

  @Post('login')
  @ApiResponse({
    type: LoggedUserRdo,
    status: HttpStatus.OK,
    description: AuthenticationResponseMessage.LoggedSuccess,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: AuthenticationResponseMessage.LoggedError,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: AuthenticationResponseMessage.LoggedError,
  })
  public async login(@Body() loginUserDto: LoginUserDto) {
    const { data } = await this.httpService.axiosRef.post(
      `${ApplicationServiceURL.Auth}/login`,
      loginUserDto
    );
    return data;
  }

  @Patch('update')
  @ApiResponse({
    status: HttpStatus.OK,
    description: AuthenticationResponseMessage.PasswordUpdated,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: AuthenticationResponseMessage.UserNotFound,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: AuthenticationResponseMessage.Unauthorized,
  })
  @UseGuards(CheckAuthGuard)
  @ApiBearerAuth('accessToken')
  public async update(@Body() dto: UpdateUserDto, @Req() req: Request) {
    const { data } = await this.httpService.axiosRef.patch(
      `${ApplicationServiceURL.Auth}/update`,
      dto,
      {
        headers: {
          Authorization: req.headers['authorization'],
        },
      }
    );

    return data;
  }

  @Get(':id')
  @UseGuards(CheckAuthGuard)
  @ApiBearerAuth('accessToken')
  @ApiResponse({
    type: UserRdo,
    status: HttpStatus.OK,
    description: AuthenticationResponseMessage.UserFound,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: AuthenticationResponseMessage.UserNotFound,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: AuthenticationResponseMessage.Unauthorized,
  })
  public async show(@Param('id') id: string, @Req() req: Request) {
    const { data } = await this.httpService.axiosRef.get(
      `${ApplicationServiceURL.Auth}/${id}`,
      {
        headers: {
          Authorization: req.headers['authorization'],
        },
      }
    );

    return data;
  }

  @UseGuards(CheckAuthGuard)
  @ApiBearerAuth('accessToken')
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: AuthenticationResponseMessage.UserFound,
  })
  @Post('check')
  public async checkToken(@Req() req: Request) {
    const { data } = await this.httpService.axiosRef.post(
      `${ApplicationServiceURL.Auth}/check`,
      null,
      {
        headers: {
          Authorization: req.headers['authorization'],
        },
      }
    );

    return data;
  }
}
