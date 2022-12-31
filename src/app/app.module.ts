import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from "../user/user.module";
import { ConfigModule, ConfigService } from "@nestjs/config";
import configurations from "../configurations";
import {SequelizeModule} from "@nestjs/sequelize";
import { User } from "../user/models/user.model";
import { TokenModule } from "../token/token.module";
import { AuthModule } from "../auth/auth.module";


@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
    load: [configurations]
  }),
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService)=> ({
        dialect: "postgres",
        host: configService.get('db_host'),
        port: configService.get('db_port'),
        username: configService.get('db_user'),
        password: configService.get('db_password'),
        database: configService.get('db_database'),
        synchronize: true,
        autoLoadModels: true,
        models: [User]
      })
    }),
    UserModule, TokenModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
