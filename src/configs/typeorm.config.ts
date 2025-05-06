import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

export const typeormORMConfig = async (configService: ConfigService): Promise<TypeOrmModuleOptions> => {
  const entitiesPath = configService.get<string>('DATABASE_ENTITIES');
  if (!entitiesPath) {
    throw new Error('DATABASE_ENTITIES is not defined in .env file');
  }

  return {
    type: configService.get<string>('DATABASE_TYPE') as 'postgres',
    host: configService.get<string>('DATABASE_HOST'),
    port: configService.get<number>('DATABASE_PORT'),
    username: configService.get<string>('DATABASE_USERNAME'),
    password: configService.get<string>('DATABASE_PASSWORD'),
    database: configService.get<string>('DATABASE_NAME'),
    entities: [entitiesPath],
    synchronize: configService.get<boolean>('DATABASE_SYNCHRONIZE'),
  };
};