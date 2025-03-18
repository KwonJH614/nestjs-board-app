import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export const typeormORMConfig : TypeOrmModuleOptions = {
  type : 'postgres',
  host : 'localhost',
  port : 5432,
  username : 'postgres',
  password : '1234',
  database : 'board-app',
  entities : [__dirname + '/../**/*.entity.{js,ts}'],
  synchronize : true
}