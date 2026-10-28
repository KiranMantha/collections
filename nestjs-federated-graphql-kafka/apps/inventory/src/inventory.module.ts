import { InventoryEntity } from '@libs/common';
import { KafkaConsumer } from '@libs/kafka';
import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import BetterSqlite3 from 'better-sqlite3';
import { InventoryResolver } from './inventory.resolver';
import { InventoryService } from './inventory.service';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      autoSchemaFile: { federation: 2 },
    }),
    TypeOrmModule.forRoot({
      type: 'better-sqlite3',
      // Passed explicitly: TypeORM's dynamic require(name) can't be traced by the bundler
      driver: BetterSqlite3,
      database: '../data/inventory.sqlite',
      entities: [InventoryEntity],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([InventoryEntity]),
  ],
  providers: [
    InventoryService,
    InventoryResolver,
    {
      provide: KafkaConsumer,
      useClass: KafkaConsumer,
    },
  ],
})
export class InventoryModule {}
