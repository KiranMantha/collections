import { OrderEntity } from '@libs/common';
import { KafkaProducer } from '@libs/kafka';
import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import BetterSqlite3 from 'better-sqlite3';
import { OrdersResolver } from './orders.resolver';
import { OrdersService } from './orders.service';

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
      database: '../data/orders.sqlite',
      entities: [OrderEntity],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([OrderEntity]),
  ],
  providers: [
    OrdersService,
    OrdersResolver,
    {
      provide: KafkaProducer,
      useClass: KafkaProducer,
    },
  ],
})
export class OrdersModule {}
