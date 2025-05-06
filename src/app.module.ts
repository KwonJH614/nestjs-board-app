import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardsModule } from './boards/boards.module';
import { AuthModule } from './auth/auth.module';
import { typeormORMConfig } from './configs/typeorm.config';
import * as Joi from 'joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      validationSchema: Joi.object({
        DATABASE_TYPE: Joi.string().valid('postgres').required(),
        DATABASE_HOST: Joi.string().required(),
        DATABASE_PORT: Joi.number().default(5432),
        DATABASE_USERNAME: Joi.string().required(),
        DATABASE_PASSWORD: Joi.string().required(),
        DATABASE_NAME: Joi.string().required(),
        DATABASE_ENTITIES: Joi.string().required(),
        DATABASE_SYNCHRONIZE: Joi.boolean().default(true),
      }),
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: typeormORMConfig,
      inject: [ConfigService],
    }),
    BoardsModule,
    AuthModule,
  ],
})
export class AppModule {}