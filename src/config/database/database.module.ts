import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ormConfig } from './database.config';

@Module({
    imports: [TypeOrmModule.forRoot(ormConfig)],
})
export class DatabaseModule {}
