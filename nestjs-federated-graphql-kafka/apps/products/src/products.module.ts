import { ProductEntity } from '@libs/common';
import { KafkaProducer } from '@libs/kafka';
import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import BetterSqlite3 from 'better-sqlite3';
import { ProductsResolver } from './products.resolver';
import { ProductsService } from './products.service';

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
      database: '../data/products.sqlite',
      entities: [ProductEntity],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([ProductEntity]),
  ],
  providers: [
    ProductsService,
    ProductsResolver,
    {
      provide: KafkaProducer,
      useClass: KafkaProducer,
    },
  ],
})
export class ProductsModule {}
