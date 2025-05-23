import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { Module } from "@nestjs/common";
import { GraphQLModule } from "@nestjs/graphql";
import { ConfigModule } from "./config/config.module";
import { ConfigService } from "./config/config.service";
import { PrismaModule } from "./prisma/prisma.module";
import { UsersModule } from "./users/users.module";

@Module({
  imports: [
    ConfigModule,
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      inject: [ConfigService],
      useFactory: () => ({
        autoSchemaFile: true,
        sortSchema: true,
        playground: true,
        debug: true,
        introspection: true,
      }),
    }),
    PrismaModule,
    UsersModule,
  ],
})
export class AppModule {}
