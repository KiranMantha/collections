import { IntrospectAndCompose } from '@apollo/gateway';
import { ApolloGatewayDriver, ApolloGatewayDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { readFileSync } from 'fs';
import { join } from 'path';

// Load subgraphs from JSON file
const subgraphs = JSON.parse(
  readFileSync(join(process.cwd(), 'subgraphs.json'), 'utf8'),
) as { name: string; url: string }[];

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloGatewayDriverConfig>({
      driver: ApolloGatewayDriver,
      gateway: {
        supergraphSdl: new IntrospectAndCompose({
          subgraphs,
          pollIntervalInMs: 5000, //Poll for schema changes every 5s
        }),
      },
    }),
  ],
})
export class GraphqlGatewayModule {}
